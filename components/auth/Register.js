import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import classes from './Register.module.css'
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
      !password.match(/^[a-zA-Z0-9!@#$%^&*\-]+$/)
    ) {
      validForm = false
      setEnteredPasswordIsValid(false)
    }

    /* confirmed password match validation */
    if (confirmed.trim() === '' || password !== confirmed) {
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
          router.replace(`/users/${username}`)
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
    <>
      {!loading && (
        <Card>
          <h2>Register User</h2>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
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
                    ? classes.controlError
                    : null
                }
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={inputChangeHandler}
                value={userData.password}
                className={
                  formSubmitted && !enteredPasswordIsValid
                    ? classes.controlError
                    : null
                }
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='confirmed'>Confirm Password</label>
              <input
                type='password'
                id='confirmed'
                name='confirmed'
                onChange={inputChangeHandler}
                value={userData.confirmed}
                className={
                  formSubmitted && !enteredConfirmedIsValid
                    ? classes.controlError
                    : null
                }
              />
            </div>
            <div className={classes.actions}>
              <Button>Register</Button>
            </div>
            <p>
              Already registered?{' '}
              <Link href='/users/login'>Login instead.</Link>
            </p>
            {formSubmitted && APIError && (
              <p className={classes.error}>
                API call failed.
                <br />
                Contact the administrator.
              </p>
            )}
            {formSubmitted && usernameExists && (
              <p className={classes.error}>
                Username exists.
                <br />
                That name was so good, someone stole it.
              </p>
            )}
            {formSubmitted && !enteredUsernameIsValid && (
              <p className={classes.error}>
                Invalid username.
                <br />
                Is username between 4 and 14 characters long?
                <br />
                Does it contain only alphanumeric characters?
              </p>
            )}
            {formSubmitted && !enteredPasswordIsValid && (
              <p className={classes.error}>
                Invalid password.
                <br />
                Is password at least 8 characters long?
              </p>
            )}
            {formSubmitted && !enteredConfirmedIsValid && (
              <p className={classes.error}>Passwords must match.</p>
            )}
          </form>
        </Card>
      )}

      {loading && (
        <>
          <h2>Registration Successful</h2>
          <p>Pulling profile from database...</p>
        </>
      )}
    </>
  )
}
