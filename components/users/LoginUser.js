import { useRef, useState } from 'react'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import styles from './LoginUser.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Link from 'next/link'

export default function LoginUser() {
  const [usernameExists, setUsernameExists] = useState(true)
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loading, setLoading] = useState(false)
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const router = useRouter()

  async function submitHandler(e) {
    e.preventDefault()
    setUsernameExists(true)
    setPasswordIncorrect(false)
    setLoading(true)

    const enteredUsername = usernameInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    /* send entered credentials to the api/auth/[...nextauth].js for authentication */
    const result = await signIn('credentials', {
      redirect: false,
      username: enteredUsername,
      password: enteredPassword,
    })

    /* if no username in database, give that feedback */
    if (result.error === 'No user found') {
      setLoading(false)
      setUsernameExists(false)
    }

    /* if passwords don't match, give that feedback */
    if (result.error === 'Password does not match') {
      setLoading(false)
      setPasswordIncorrect(true)
    }

    /* if no error, proceed! */
    if (!result.error) {
      router.replace(`/users/${enteredUsername}`)
    }
  }

  return (
    <>
      {!loading && (
        <Card color='rgb(215, 88, 231)'>
          <h2>Login</h2>
          <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.control}>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                required
                id='username'
                ref={usernameInputRef}
              />
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
            <div className={styles.actions}>
              <Button>Login</Button>
            </div>
            {!usernameExists && (
              <p className={styles.error}>
                Username not found.
                <br />
                <Link href='/users/register'>Register a new account?</Link>
              </p>
            )}
            {passwordIncorrect && (
              <p className={styles.error}>Password does not match.</p>
            )}
          </form>
        </Card>
      )}

      {loading && <p>Pulling profile from database...</p>}
    </>
  )
}
