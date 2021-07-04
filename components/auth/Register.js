import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Link from 'next/link'

async function createUser(username, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })
  return response.status
}

export default function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmed: '',
  })
  const [enteredUsernameIsValid, setEnteredUsernameIsValid] = useState()
  const [usernameExists, setUsernameExists] = useState()
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState()
  const [enteredConfirmedIsValid, setEnteredConfirmedIsValid] = useState()
  const [formSubmitted, setFormSubmitted] = useState()
  const [APIError, setAPIError] = useState()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  /* set valid form inputs to true every update for better user experience */
  useEffect(() => {
    setEnteredUsernameIsValid(true)
    setEnteredPasswordIsValid(true)
    setEnteredConfirmedIsValid(true)
    setFormSubmitted(false)
    setUsernameExists(false)
    setAPIError(false)
  }, [userData])

  /* input change handler */
  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case 'username':
        setUserData((prevState) => ({ ...prevState, username: e.target.value }))
        break
      case 'password':
        setUserData((prevState) => ({ ...prevState, password: e.target.value }))
        break
      case 'confirmed':
        setUserData((prevState) => ({
          ...prevState,
          confirmed: e.target.value,
        }))
        break
    }
  }

  /* form submit handler */
  async function submitHandler(e) {
    e.preventDefault()
    setFormSubmitted(true)
    let validForm = true
    const { username, password, confirmed } = userData

    /* username validation */
    if (
      username.trim() === '' ||
      username.trim().length < 4 ||
      username.trim().length > 14 ||
      !username.match(/^[a-zA-Z0-9\-]+$/)
    ) {
      validForm = false
      setEnteredUsernameIsValid(false)
    }

    /* password validation */
    if (
      password.trim() === '' ||
      password.trim().length < 8 ||
      !password.match(/^[a-zA-Z0-9!@#$%^&*-]+$/)
    ) {
      validForm = false
      setEnteredPasswordIsValid(false)
    }

    /* confirmed password match validation */
    if (confirmed.trim() !== '' && password !== confirmed) {
      validForm = false
      setEnteredConfirmedIsValid(false)
    }

    /* if any validations failed, break out of submit handler */
    if (!validForm) return

    /* try block for creating user with fetch API call */
    try {
      const result = await createUser(username, password)
      if (result === 514) {
        /* if API returns 514, username already exists in database */
        setUsernameExists(true)
        return
      } else if (result === 512) {
        /* if API returns 512, username failed server-side validation */
        setEnteredUsernameIsValid(false)
        return
      } else if (result === 513) {
        /* if API returns 513, password failed server-side validation */
        setEnteredPasswordIsValid(false)
        return
      } else if (result === 201) {
        /* if API returns 201, user was successfully created
        so let's go ahead and log them in */
        const result = await signIn('credentials', {
          redirect: false,
          username,
          password,
        })

        if (!result.error) {
          /* as long as signIn gave us no errors, reroute user to profile */
          setLoading(true)
          router.replace(`/user/${username}`)
        } else {
          setAPIError(true)
        }
      } else {
        /* if API returns any other status, something unforeseen occurred! */
        setAPIError(true)
      }
    } catch (err) {
      setAPIError(true)
    }
  }

  return (
    <div className='singularContainer'>
      {!loading && (
        <Card>
          <h2>Register User</h2>
          <form onSubmit={submitHandler}>
            <div className='control'>
              <label htmlFor='username'>Username</label>
              <input
                autoComplete='off'
                type='text'
                id='username'
                name='username'
                onChange={inputChangeHandler}
                value={userData.username}
                className={
                  (formSubmitted && !enteredUsernameIsValid) || usernameExists
                    ? 'controlError'
                    : null
                }
              />
            </div>
            <div className='control'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={inputChangeHandler}
                value={userData.password}
                className={
                  formSubmitted && !enteredPasswordIsValid
                    ? 'controlError'
                    : null
                }
              />
            </div>
            <div className='control'>
              <label htmlFor='confirmed'>Confirm Password</label>
              <input
                type='password'
                id='confirmed'
                name='confirmed'
                onChange={inputChangeHandler}
                value={userData.confirmed}
                className={
                  formSubmitted && !enteredConfirmedIsValid
                    ? 'controlError'
                    : null
                }
              />
            </div>
            <Button>Register</Button>
            <p>
              Already registered? <Link href='/login'>Login instead.</Link>
            </p>
            <p className='error'>
              Don't forget your username and password, as these accounts are
              throwaway and cannot be recovered if credentials are forgotten.
            </p>
            {formSubmitted && APIError && (
              <p className='error'>
                <strong>Error: API call failed.</strong>
                <br />
                <br />
                Contact the administrator. This is a real problem, dude.
              </p>
            )}
            {formSubmitted && usernameExists && (
              <p className='error'>
                <strong>Error: Username exists.</strong>
                <br />
                <br />
                That name was so good, someone stole it.
              </p>
            )}
            {formSubmitted && !enteredUsernameIsValid && (
              <p className='error'>
                <strong>Error: Invalid username.</strong>
                <br />
                <br />
                Username must be between 4-14 characters long and contain only
                alphanumeric characters.
              </p>
            )}
            {formSubmitted && !enteredPasswordIsValid && (
              <p className='error'>
                <strong>Error: Invalid password.</strong>
                <br />
                <br />
                Password must be at least 8 characters long and may contain the
                following special characters: ! @ # $ % ^ & * -
              </p>
            )}
            {formSubmitted && !enteredConfirmedIsValid && (
              <p className='error'>
                <strong>Error: Invalid password.</strong>
                <br />
                <br />
                Password and Confirm Password must match.
              </p>
            )}
          </form>
        </Card>
      )}

      {loading && (
        <Card>
          <h2>Registration Successful</h2>
          <p>Pulling profile from database...</p>
        </Card>
      )}
    </div>
  )
}
