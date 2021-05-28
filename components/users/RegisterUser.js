import { useRef, useState } from 'react'
import styles from './RegisterUser.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'

async function createUser(username, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }

  return data
}

export default function RegisterUser(props) {
  const [existingUsername, setExistingUsername] = useState(false)
  const [invalidUsername, setInvalidUsername] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [unmatchedPassword, setUnmatchedPassword] = useState(false)
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()

  async function submitHandler(e) {
    e.preventDefault()

    setExistingUsername(false)
    setInvalidUsername(false)
    setInvalidPassword(false)
    setUnmatchedPassword(false)

    const enteredUsername = usernameInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredConfirmPassword = confirmPasswordInputRef.current.value

    if (props.users.includes(enteredUsername)) {
      setExistingUsername(true)
    }

    if (enteredUsername.trim().length < 5) {
      setInvalidUsername(true)
    }

    if (enteredPassword.trim().length < 8) {
      setInvalidPassword(true)
    }

    if (enteredPassword !== enteredConfirmPassword) {
      setUnmatchedPassword(true)
    }

    if (
      existingUsername ||
      invalidUsername ||
      invalidPassword ||
      UnmatchedPassword
    ) {
      return
    }

    try {
      const result = await createUser(enteredUsername, enteredPassword)
      setExistingUsername(false)
      setInvalidUsername(false)
      setInvalidPassword(false)
      setUnmatchedPassword(false)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Card color='rgb(215, 88, 231)'>
        <h2>Register</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor='username'>Username</label>
            <input type='text' required id='username' ref={usernameInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              required
              id='password'
              ref={passwordInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              required
              id='confirmPassword'
              ref={confirmPasswordInputRef}
            />
          </div>
          <div className={styles.actions}>
            <Button>Register</Button>
          </div>
          {existingUsername && (
            <p className={styles.error}>
              The username is already in use.
              <br />
              Please choose something else.
            </p>
          )}
          {invalidUsername && (
            <p className={styles.error}>
              Invalid username.
              <br />
              Username must be at least 5 characters long.
            </p>
          )}
          {invalidPassword && (
            <p className={styles.error}>
              Invalid password entries.
              <br />
              Passwords must be at least 8 characters long.
            </p>
          )}
          {unmatchedPassword && (
            <p className={styles.error}>Passwords must match.</p>
          )}
        </form>
      </Card>
    </>
  )
}
