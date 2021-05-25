import { useRef } from 'react'
import styles from './RegisterUser.module.css'

export default function RegisterUser(props) {
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()
  const bioInputRef = useRef()
  const locationInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    const enteredUsername = usernameInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredConfirmedPassword = confirmedPasswordInputRef.current.value
    const enteredBio = bioInputRef.current.value
    const enteredLocation = locationInputRef.current.value

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
      confirmedPassword: enteredConfirmedPassword,
      bio: enteredBio,
      location: enteredLocation,
    }

    props.onAddUser(userData)
  }

  return (
    <>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='username'>Email Address</label>
          <input type='text' required id='username' ref={usernameInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Password</label>
          <input type='text' required id='password' ref={passwordInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='text'
            required
            id='confirmPassword'
            ref={confirmPasswordInputRef}
          />
        </div>
        <p>
          You will be sent an email containing a confirmation link. Your account
          will need to be confirmed before you can edit your profile, comment on
          pages, or add friends. <em>Use a unique throwaway password.</em>
        </p>
        <div className={styles.actions}>
          <button>Register</button>
        </div>
      </form>
    </>
  )
}
