import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './EditProfile.module.css'
import Card from '../layout/Card'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

export default function EditProfile(props) {
  const [session, _] = useSession()
  const router = useRouter()

  const [userData, setUserData] = useState({
    password: '',
    confirmed: '',
    bio: '',
    firstname: '',
    birthday: '',
    location: '',
    bonnaroos: '',
    videoURL: '',
    facebookURL: '',
    instaURL: '',
    twitterURL: '',
    friendsEnabled: '',
    commentsEnabled: '',
  })

  const [errors, setErrors] = useState({
    bio: false,
    firstname: false,
    location: false,
    videoURL: false,
    social: false,
    password: false,
    confirmed: false,
  })

  /* use pre-existing info to fill out form on first load */
  useEffect(() => {
    setUserData({
      password: '',
      confirmed: '',
      bio: props.user.bio,
      firstname: props.user.firstname,
      birthday: props.user.birthday,
      location: props.user.location,
      bonnaroos: props.user.bonnaroos,
      videoURL: props.user.videoURL,
      facebookURL: props.user.facebookURL,
      instaURL: props.user.instaURL,
      twitterURL: props.user.twitterURL,
      friendsEnabled: props.user.friendsEnabled,
      commentsEnabled: props.user.commentsEnabled,
    })
  }, [])

  /* switch case input change handler updates the userData
  state and also resets appropriate error states */
  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case 'bio':
        setUserData((prevState) => ({
          ...prevState,
          bio: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          bio: false,
        }))
        break
      case 'firstname':
        setUserData((prevState) => ({
          ...prevState,
          firstname: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          firstname: false,
        }))
        break
      case 'birthday':
        setUserData((prevState) => ({
          ...prevState,
          birthday: e.target.value,
        }))
        break
      case 'location':
        setUserData((prevState) => ({
          ...prevState,
          location: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          location: false,
        }))
        break
      case 'bonnaroos':
        setUserData((prevState) => ({
          ...prevState,
          bonnaroos: e.target.value,
        }))
        break
      case 'facebookURL':
        setUserData((prevState) => ({
          ...prevState,
          facebookURL: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          social: false,
        }))
        break
      case 'instaURL':
        setUserData((prevState) => ({
          ...prevState,
          instaURL: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          social: false,
        }))
        break
      case 'twitterURL':
        setUserData((prevState) => ({
          ...prevState,
          twitterURL: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          social: false,
        }))
        break
      case 'videoURL':
        setUserData((prevState) => ({
          ...prevState,
          videoURL: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          videoURL: false,
        }))
        break
      case 'password':
        setUserData((prevState) => ({
          ...prevState,
          password: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          password: false,
        }))
        break
      case 'confirmed':
        setUserData((prevState) => ({
          ...prevState,
          confirmed: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          confirmed: false,
        }))
        break
      case 'commentsEnabled':
        setUserData((prevState) => ({
          ...prevState,
          commentsEnabled: e.target.value,
        }))
        break
      case 'friendsEnabled':
        setUserData((prevState) => ({
          ...prevState,
          friendsEnabled: e.target.value,
        }))
        break
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    let validForm = true

    /* client-side input validation checks performed here */
    if (
      (userData.password.trim().length > 0 &&
        userData.password.trim().length < 8) ||
      (userData.password.trim().length > 0 &&
        !userData.password.match(/^[a-zA-Z0-9!@#$%^&*\-]+$/))
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        password: true,
      }))
    }

    if (
      userData.password.length > 0 &&
      userData.password !== userData.confirmed
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        confirmed: true,
      }))
    }

    if (userData.bio.trim().length > 500) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        bio: true,
      }))
    }

    if (userData.firstname.trim().length > 30) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        firstname: true,
      }))
    }

    if (userData.location.trim().length > 30) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        location: true,
      }))
    }

    if (
      userData.facebookURL.trim().length > 30 ||
      userData.facebookURL.includes('.com') ||
      userData.instaURL.trim().length > 30 ||
      userData.instaURL.includes('.com') ||
      userData.twitterURL.trim().length > 30 ||
      userData.twitterURL.includes('.com')
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        social: true,
      }))
    }

    if (
      userData.videoURL.trim().length > 45 ||
      !userData.videoURL.includes('www.youtube.com/watch?')
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        videoURL: true,
      }))
    }

    /* if any validations failed, break out of submit handler */
    if (!validForm) return

    await fetch('/api/user/edit-profile', {
      method: 'POST',
      body: JSON.stringify({
        ...userData,
        username: session.user.name,
        newPassword: userData.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to our profile after we hit submit */
    router.push(`/user/${props.user.username}`)
  }

  return (
    <>
      {!session && (
        <p>
          Something went wrong with your session. Please refresh this page to
          reload your session.
        </p>
      )}
      {session && (
        <form className='doubleForm' onSubmit={submitHandler}>
          {/* LEFT-SIDE PANE */}
          <div>
            <Card>
              <BigHeadline style={{ color: randomColorGenerator() }}>
                {props.user.username} Profile Editor
              </BigHeadline>
              <div>
                <Headline style={{ color: randomColorGenerator() }}>
                  <label htmlFor='bio'>Tell Us About Yourself</label>
                </Headline>
                <p>
                  What do you love about Bonnaroo? Who's going with you? Which
                  is your favorite Telletubby? Tell us anything!
                </p>
                <div className='control'>
                  <textarea
                    onChange={inputChangeHandler}
                    value={userData.bio}
                    name='bio'
                    id='bio'
                    rows='8'
                    className={errors.bio ? 'controlError' : null}
                  ></textarea>
                </div>
                {errors.bio && (
                  <p className='error'>Bio must be below 500 characters.</p>
                )}
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor='firstname'>First Name</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.firstname}
                            autoComplete='off'
                            name='firstname'
                            id='firstname'
                            type='text'
                            className={errors.firstname ? 'controlError' : null}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    {errors.firstname && (
                      <tr>
                        <td colspan='2'>
                          <p className='error'>
                            First name must be below 30 characters.
                          </p>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        <label htmlFor='birthday'>Born On</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.birthday}
                            name='birthday'
                            id='birthday'
                            type='date'
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor='location'>Hometown</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.location}
                            autoComplete='off'
                            name='location'
                            id='location'
                            type='text'
                            className={errors.location ? 'controlError' : null}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    {errors.location && (
                      <tr>
                        <td colspan='2'>
                          <p className='error'>
                            Hometown must be below 30 characters.
                          </p>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        <label htmlFor='bonnaroos'>Roos Attended</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.bonnaroos}
                            name='bonnaroos'
                            id='bonnaroos'
                            type='number'
                          ></input>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Headline style={{ color: randomColorGenerator() }}>
                  Your Social Accounts
                </Headline>{' '}
                <p>
                  Social links must be your username only, not the full URL to
                  your page.
                </p>
                <table className={classes.table}>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor='facebookURL'>Facebook Username</label>
                      </td>
                      <td>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.facebookURL}
                            autoComplete='off'
                            name='facebookURL'
                            id='facebookURL'
                            type='text'
                            className={errors.social ? 'controlError' : null}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor='instaURL'>Instagram Username</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.instaURL}
                            autoComplete='off'
                            name='instaURL'
                            id='instaURL'
                            type='text'
                            className={errors.social ? 'controlError' : null}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor='twitterURL'>Twitter Handle</label>
                      </td>
                      <td align='right'>
                        <div className='control'>
                          <input
                            onChange={inputChangeHandler}
                            value={userData.twitterURL}
                            autoComplete='off'
                            name='twitterURL'
                            id='twitterURL'
                            type='text'
                            className={errors.social ? 'controlError' : null}
                          ></input>
                        </div>
                      </td>
                    </tr>
                    {errors.social && (
                      <tr>
                        <td colspan='2'>
                          <p className='error'>
                            Social accounts must be your USERNAME for the given
                            service, not the URL to your profile page.
                            <br />
                            <br />
                            Example: branjames117
                            <br />
                            NOT: <em>facebook.com/branjames117</em>
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* RIGHT-SIDE PANE */}
          <div>
            <Card>
              <Headline style={{ color: randomColorGenerator() }}>
                A Favorite Music Video
              </Headline>
              <div className='control'>
                <label htmlFor='video'>
                  <p>
                    Must be a link to a YouTube video, like{' '}
                    <em>https://www.youtube.com/watch?v=osdoLjUNFnA</em>
                  </p>
                </label>
                <input
                  onChange={inputChangeHandler}
                  value={userData.videoURL}
                  autoComplete='off'
                  name='videoURL'
                  id='videoURL'
                  type='text'
                  className={errors.videoURL ? 'controlError' : null}
                ></input>
                {errors.videoURL && (
                  <p className='error'>
                    YouTube URL must be a URL like the one in the example above.
                  </p>
                )}
              </div>
            </Card>
            <Card>
              <Headline style={{ color: randomColorGenerator() }}>
                Options
              </Headline>
              <div className='control'>
                <label htmlFor='password'>New password (optional):</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={inputChangeHandler}
                  value={userData.password}
                  className={errors.password ? 'controlError' : null}
                ></input>
              </div>
              <div className='control'>
                <label htmlFor='confirmed'>Confirm new password:</label>
                <input
                  type='password'
                  name='confirmed'
                  id='confirmed'
                  onChange={inputChangeHandler}
                  value={userData.confirmed}
                  className={errors.confirmed ? 'controlError' : null}
                ></input>
              </div>
              {errors.password && (
                <p className='error'>
                  Invalid password entries.
                  <br />
                  Passwords must be at least 8 characters long.
                </p>
              )}
              {errors.confirmed && (
                <p className='error'>Passwords must match.</p>
              )}
              <div className='control'>
                <label htmlFor='commentsEnabled'>
                  Allow comments on profile page:
                </label>
                <select
                  onChange={inputChangeHandler}
                  value={userData.commentsEnabled}
                  name='commentsEnabled'
                  id='commentsEnabled'
                >
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>
              <div className='control'>
                <label htmlFor='friendsEnabled'>
                  Show friends on profile page:
                </label>
                <select
                  onChange={inputChangeHandler}
                  value={userData.friendsEnabled}
                  name='friendsEnabled'
                  id='friendsEnabled'
                >
                  <option value='true'>Yes</option>
                  <option value='false'>No</option>
                </select>
              </div>
              <Button onClick={submitHandler}>save changes</Button>
            </Card>
          </div>
        </form>
      )}
    </>
  )
}
