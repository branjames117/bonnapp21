import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/client'
import classes from './Login.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Link from 'next/link'

export default function Login() {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const [usernameExists, setUsernameExists] = useState()
  const [passwordIncorrect, setPasswordIncorrect] = useState()
  const [formSubmitted, setFormSubmitted] = useState()
  const [APIError, setAPIError] = useState()
  const [loading, setLoading] = useState(false)
  /* unlike in Register component, going to use Refs instead of State to track inputs, for variety's sake */
  const router = useRouter()

  /* set valid form inputs to true just at initial render */
  useEffect(() => {
    setUsernameExists(true)
    setPasswordIncorrect(false)
    setFormSubmitted(false)
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
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    setFormSubmitted(true)
    let validForm = true
    const { username, password } = userData

    /* username validation, same as on register */
    if (
      username.trim() === '' ||
      username.trim().length < 4 ||
      username.trim().length > 14 ||
      !username.match(/^[a-zA-Z0-9\-]+$/)
    ) {
      validForm = false
      setUsernameExists(false)
    }

    /* password validation, same as on register */
    if (
      password.trim() === '' ||
      password.trim().length < 8 ||
      !password.match(/^[a-zA-Z0-9!@#$%^&*\-]+$/)
    ) {
      validForm = false
      setPasswordIncorrect(true)
    }

    if (!validForm) return

    console.log(userData)

    /* try block for logging in user */
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: username,
        password: password,
      })
      console.log(username)

      console.log(result)
      console.log(result.error)

      /* if database connection issue, give that feedback */
      if (result.error === 'No connection to the database') {
        setLoading(false)
        setAPIError(true)
        return
      }

      /* if no username in database, give that feedback */
      if (result.error === 'No user found') {
        setLoading(false)
        setUsernameExists(false)
        return
      }

      /* if passwords don't match, give that feedback */
      if (result.error === 'Password does not match') {
        setLoading(false)
        setPasswordIncorrect(true)
        return
      }

      if (!result.error) {
        /* as long as signIn gave us no errors, reroute user to profile */
        setLoading(true)
        router.replace(`/user/${username}`)
      } else {
        setAPIError(true)
      }
    } catch (err) {
      setAPIError(true)
    }
  }

  return (
    <div className={classes.container}>
      {!loading && (
        <Card>
          <h2>Login User</h2>
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
                  formSubmitted && !usernameExists ? classes.controlError : null
                }
              />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                required
                id='password'
                name='password'
                onChange={inputChangeHandler}
                value={userData.password}
                className={
                  formSubmitted && passwordIncorrect
                    ? classes.controlError
                    : null
                }
              />
            </div>
            <div className={classes.actions}>
              <Button>Login</Button>
            </div>
            <p className={classes.body}>
              Don't have an account?{' '}
              <Link href='/user/register'>Create one!</Link>
            </p>
            {!usernameExists && (
              <p className={classes.error}>Username not found.</p>
            )}
            {passwordIncorrect && (
              <p className={classes.error}>Password does not match record.</p>
            )}
            {APIError && (
              <p className={classes.error}>
                Something went wrong with the database.
                <br />
                Contact the administrator.
              </p>
            )}
          </form>
        </Card>
      )}

      {loading && (
        <Card>
          <h2>Login Successful</h2>
          <p>Pulling profile from database...</p>
        </Card>
      )}
    </div>
  )
}
