import { useRef, useState } from 'react'
import classes from './EditProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import { useSession } from 'next-auth/client'

export default function EditProfile(props) {
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [unmatchedPassword, setUnmatchedPassword] = useState(false)
  const [session, _] = useSession()
  const bioInputRef = useRef()
  const firstnameInputRef = useRef()
  const birthdayInputRef = useRef()
  const locationInputRef = useRef()
  const bonnaroosInputRef = useRef()
  const videoInputRef = useRef()
  const facebookInputRef = useRef()
  const instaInputRef = useRef()
  const twitterInputRef = useRef()
  const friendsEnabledInputRef = useRef()
  const commentsEnabledInputRef = useRef()
  const newPasswordInputRef = useRef()
  const confirmedPasswordInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    setInvalidPassword(false)
    setUnmatchedPassword(false)

    const enteredBio = bioInputRef.current.value
    const enteredFirstName = firstnameInputRef.current.value
    const enteredBirthday = birthdayInputRef.current.value
    const enteredLocation = locationInputRef.current.value
    const enteredBonnaroos = bonnaroosInputRef.current.value
    const enteredVideoURL = videoInputRef.current.value
    const enteredFacebookURL = facebookInputRef.current.value
    const enteredInstaURL = instaInputRef.current.value
    const enteredTwitterURL = twitterInputRef.current.value
    const enteredFriendsEnabled = friendsEnabledInputRef.current.value
    const enteredCommentsEnabled = commentsEnabledInputRef.current.value
    const enteredNewPassword = newPasswordInputRef.current.value
    const enteredConfirmedPassword = confirmedPasswordInputRef.current.value

    if (enteredNewPassword.length > 0 && enteredNewPassword.trim().length < 8) {
      setInvalidPassword(true)
      return
    }

    if (
      enteredNewPassword.length > 0 &&
      enteredNewPassword !== enteredConfirmedPassword
    ) {
      setUnmatchedPassword(true)
      return
    }

    const userData = {
      username: session.user.name,
      bio: enteredBio || props.user.bio,
      firstname: enteredFirstName || props.user.firstname,
      birthday: enteredBirthday || props.user.birthday,
      location: enteredLocation || props.user.location,
      bonnaroos: enteredBonnaroos || props.user.bonnaroos,
      videoURL: enteredVideoURL || props.user.videoURL,
      facebookURL: enteredFacebookURL || props.user.facebookURL,
      instaURL: enteredInstaURL || props.user.instaURL,
      twitterURL: enteredTwitterURL || props.user.twitterURL,
      friendsEnabled: enteredFriendsEnabled.length > 0,
      commentsEnabled: enteredCommentsEnabled.length > 0,
      newPassword: enteredNewPassword,
    }

    props.onUserProfileEdit(userData)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.container}>
        {/* LEFT-SIDE PANE */}
        <div>
          <Card color='brown'>
            <h1 className={classes.h1}>
              Editing {props.user.username}'s Profile
            </h1>
            <div className={classes.body}>
              <h2 className={classes.h2}>
                <label htmlFor='bio'>About Me</label>
              </h2>
              <div className={classes.control}>
                <textarea
                  placeholder={props.user.bio}
                  id='bio'
                  rows='3'
                  ref={bioInputRef}
                ></textarea>
              </div>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor='firstname'>First Name</label>
                    </td>
                    <td align='right'>
                      <div className={classes.control}>
                        <input
                          placeholder={props.user.firstname}
                          type='text'
                          id='location'
                          ref={firstnameInputRef}
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='birthday'>Birthday</label>
                    </td>
                    <td align='right'>
                      <div className={classes.control}>
                        <input
                          type='date'
                          id='birthday'
                          ref={birthdayInputRef}
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='location'>Location</label>
                    </td>
                    <td align='right'>
                      <div className={classes.control}>
                        <input
                          placeholder={props.user.location}
                          type='text'
                          id='location'
                          ref={locationInputRef}
                        ></input>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='bonnaroos'>Roos Attended</label>
                    </td>
                    <td align='right'>
                      <div className={classes.control}>
                        <input
                          placeholder={props.user.bonnaroos}
                          type='number'
                          id='bonnaroos'
                          ref={bonnaroosInputRef}
                        ></input>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2 className={classes.h2}>Social</h2>
              <div className={classes.control}>
                <label htmlFor='facebook'>URL to Facebook Profile</label>
                <input
                  placeholder={props.user.facebookURL}
                  type='text'
                  id='facebook'
                  ref={facebookInputRef}
                ></input>
              </div>
              <div className={classes.control}>
                <label htmlFor='insta'>URL to Instagram Profile</label>
                <input
                  placeholder={props.user.instaURL}
                  type='text'
                  id='insta'
                  ref={instaInputRef}
                ></input>
              </div>
              <div className={classes.control}>
                <label htmlFor='twitter'>URL to Twitter Profile</label>
                <input
                  placeholder={props.user.twitterURL}
                  type='text'
                  id='twitter'
                  ref={twitterInputRef}
                ></input>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT-SIDE PANE */}
        <div>
          <Card color='rgb(255, 155, 41)'>
            <h2 className={classes.h2}>Video of the Moment</h2>
            <div className={classes.control}>
              <label htmlFor='video'>
                YouTube URL to Music Video
                <br />
                Example: <em>https://www.youtube.com/watch?v=osdoLjUNFnA</em>
              </label>
              <input
                placeholder={props.user.videoURL}
                type='text'
                id='video'
                ref={videoInputRef}
              ></input>
            </div>
          </Card>
          <Card color='brown'>
            <h2 className={classes.h2}>Options</h2>
            <div className={classes.control}>
              <label htmlFor='newPassword'>
                New password (if changing, otherwise, leave blank):
              </label>
              <input
                type='password'
                id='newPassword'
                ref={newPasswordInputRef}
              ></input>
            </div>
            <div className={classes.control}>
              <label htmlFor='confirmedPassword'>Confirm new password:</label>
              <input
                type='password'
                id='confirmedPassword'
                ref={confirmedPasswordInputRef}
              ></input>
            </div>
            {invalidPassword && (
              <p className={classes.error}>
                Invalid password entries.
                <br />
                Passwords must be at least 8 characters long.
              </p>
            )}
            {unmatchedPassword && (
              <p className={classes.error}>Passwords must match.</p>
            )}
            <div className={classes.control}>
              <label htmlFor='commentsEnabled'>
                Allow comments on profile page:
              </label>
              <select
                name='comments'
                id='commentsEnabled'
                ref={commentsEnabledInputRef}
              >
                <option value='true'>Yes</option>
                <option value=''>No</option>
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor='friendsEnabled'>
                Show friends on profile page:
              </label>
              <select
                name='friends'
                id='friendsEnabled'
                ref={friendsEnabledInputRef}
              >
                <option value='true'>Yes</option>
                <option value=''>No</option>
              </select>
            </div>
            <div className={classes.actions}>
              <Button onClick={submitHandler}>Finish & Update Profile</Button>
            </div>
          </Card>
        </div>
      </div>
    </form>
  )
}
