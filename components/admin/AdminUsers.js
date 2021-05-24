import { useRef } from 'react'
import styles from './AdminShows.module.css'

export default function AdminUsers(props) {
  const usernameInputRef = useRef()
  const passwordInputRef = useRef()
  const bioInputRef = useRef()
  const locationInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    const enteredUsername = usernameInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredBio = bioInputRef.current.value
    const enteredLocation = locationInputRef.current.value

    const userData = {
      username: enteredUsername,
      password: enteredPassword,
      bio: enteredBio,
      location: enteredLocation,
    }

    props.onAddUser(userData)
  }

  return (
    <>
      <h2>Add User</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='username'>Username</label>
          <input type='text' required id='username' ref={usernameInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Password</label>
          <input type='text' required id='password' ref={passwordInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='bio'>Bio</label>
          <textarea required id='bio' rows='3' ref={bioInputRef}></textarea>
        </div>
        <div className={styles.control}>
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' ref={locationInputRef} />
        </div>
        <div className={styles.actions}>
          <button>Add User</button>
        </div>
      </form>
    </>
  )
}
