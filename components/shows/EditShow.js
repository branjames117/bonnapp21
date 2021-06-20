import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './EditShow.module.css'
import Card from '../layout/Card'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

export default function EditShow(props) {
  const [session, _] = useSession()
  const router = useRouter()

  const [showData, setShowData] = useState({
    title: '',
    genres: '',
    bio: '',
    videos: '',
    wiki: '',
    site: '',
    day: '',
    startTime: '',
    endTime: '',
    stage: '',
  })

  const [errors, setErrors] = useState({
    genres: false,
    bio: false,
    videos: false,
    wiki: false,
    site: false,
  })

  /* use pre-existing info to fill out form on first load */
  useEffect(() => {
    setShowData({
      title: props.show.title,
      genres: props.show.genres.toString(),
      bio: props.show.bio,
      videos: props.show.videos.toString(),
      wiki: props.show.wiki,
      site: props.show.site,
      day: props.show.day,
      startTime: props.show.startTime,
      endTime: props.show.endTime,
      stage: props.show.stage,
    })
  }, [])

  /* switch case input change handler updates the showData
  state and also resets appropriate error states */
  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case 'site':
        setShowData((prevState) => ({
          ...prevState,
          site: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          site: false,
        }))
        break
      case 'bio':
        setShowData((prevState) => ({
          ...prevState,
          bio: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          bio: false,
        }))
        break
      case 'wiki':
        setShowData((prevState) => ({
          ...prevState,
          wiki: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          wiki: false,
        }))
        break
      case 'genres':
        setShowData((prevState) => ({
          ...prevState,
          genres: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          genres: false,
        }))
        break
      case 'videos':
        setShowData((prevState) => ({
          ...prevState,
          videos: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          videos: false,
        }))
        break
      case 'day':
        setShowData((prevState) => ({
          ...prevState,
          day: e.target.value,
        }))
        break
      case 'startTime':
        setShowData((prevState) => ({
          ...prevState,
          startTime: e.target.value,
        }))
        break
      case 'endTime':
        setShowData((prevState) => ({
          ...prevState,
          endTime: e.target.value,
        }))
        break
      case 'stage':
        setShowData((prevState) => ({
          ...prevState,
          stage: e.target.value,
        }))
        break
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    let validForm = true

    /* client-side input validation checks performed here */
    if (showData.site.trim() === '' || showData.site.trim().length > 100) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        site: true,
      }))
    }

    if (showData.bio.trim() === '' || showData.bio.trim().length > 500) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        bio: true,
      }))
    }

    if (showData.wiki.trim() === '' || showData.wiki.trim().length > 100) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        wiki: true,
      }))
    }

    if (
      showData.genres === '' ||
      showData.genres.length === '0' ||
      showData.genres.length > 100
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        genres: true,
      }))
    }
    console.log(showData.videos)
    if (
      showData.videos === '' ||
      showData.videos.length === 0 ||
      showData.videos.length > 150 ||
      !showData.videos.includes('www.youtube.com/watch?')
    ) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        videos: true,
      }))
    }

    /* if any validations failed, break out of submit handler */
    if (!validForm) return

    await fetch('/api/show/edit-show', {
      method: 'POST',
      body: JSON.stringify({
        ...showData,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to our show after we hit submit */
    router.push(`/shows/${props.show.title}`)
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
        <form className={classes.form} onSubmit={submitHandler}>
          {/* LEFT-SIDE PANE */}
          <div>
            <Card>
              <BigHeadline
                className={classes.h1}
                style={{ color: randomColorGenerator() }}
              >
                {props.show.title} Profile Editor
              </BigHeadline>
              <div className={classes.body}>
                <div className={classes.control}>
                  <label htmlFor='site'>Official Site URL</label>
                  <input
                    onChange={inputChangeHandler}
                    value={showData.site}
                    autoComplete='off'
                    name='site'
                    id='site'
                    type='text'
                    className={errors.site ? classes.controlError : null}
                  />
                </div>
                {errors.site && (
                  <p className={classes.error}>
                    Site URL must be below 100 characters.
                  </p>
                )}
                <Headline
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  <label htmlFor='bio'>A Paragraph or Two</label>
                </Headline>
                <div className={classes.control}>
                  <textarea
                    onChange={inputChangeHandler}
                    value={showData.bio}
                    name='bio'
                    id='bio'
                    rows='8'
                    className={errors.bio ? classes.controlError : null}
                  ></textarea>
                </div>
                {errors.bio && (
                  <p className={classes.error}>
                    Bio must be below 500 characters.
                  </p>
                )}
                <div className={classes.control}>
                  <label htmlFor='wiki'>URL Source for Bio</label>
                  <input
                    onChange={inputChangeHandler}
                    value={showData.wiki}
                    autoComplete='off'
                    name='wiki'
                    id='wiki'
                    type='text'
                    className={errors.site ? classes.controlError : null}
                  />
                </div>
                {errors.wiki && (
                  <p className={classes.error}>
                    Bio source URL must be below 100 characters.
                  </p>
                )}
                <Headline
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  <label htmlFor='genres'>Genres</label>
                </Headline>
                <p className={classes.body}>Genres must be comma-separated.</p>
                <div className={classes.control}>
                  <input
                    onChange={inputChangeHandler}
                    value={showData.genres}
                    autoComplete='off'
                    name='genres'
                    id='genres'
                    type='text'
                    className={errors.genres ? classes.controlError : null}
                  />
                </div>
                {errors.genres && (
                  <p className={classes.error}>
                    Genres must be below 100 characters.
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* RIGHT-SIDE PANE */}
          <div>
            <Card>
              <Headline
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                Music Videos
              </Headline>
              <div className={classes.control}>
                <label htmlFor='videos'>
                  Must have 3 YouTube URLs, like below, comma-separated.
                  <br />
                  Example: <em>https://www.youtube.com/watch?v=osdoLjUNFnA</em>
                </label>
                <input
                  onChange={inputChangeHandler}
                  value={showData.videos}
                  name='videos'
                  id='videos'
                  type='text'
                  className={errors.videos ? classes.controlError : null}
                ></input>
                {errors.videos && (
                  <p className={classes.error}>
                    Video URLs must be URLs like the one in the example above.
                  </p>
                )}
              </div>
            </Card>
            <Card>
              <Headline
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                Time & Place
              </Headline>
              <div className={classes.control}>
                <label htmlFor='day'>Day</label>
                <select
                  onChange={inputChangeHandler}
                  value={showData.day}
                  name='day'
                  id='day'
                >
                  <option value='N/A'>N/A</option>
                  <option value='Thursday'>Thursday</option>
                  <option value='Friday'>Friday</option>
                  <option value='Saturday'>Saturday</option>
                  <option value='Sunday'>Sunday</option>
                </select>
              </div>
              <div className={classes.control}>
                <label htmlFor='startTime'>
                  Start Time (24 HR)
                  <br />
                  Example: 1500
                </label>
                <input
                  onChange={inputChangeHandler}
                  value={showData.startTime}
                  name='startTime'
                  id='startTime'
                  type='number'
                  min='0'
                  max='2400'
                ></input>
              </div>
              <div className={classes.control}>
                <label htmlFor='endTime'>
                  End Time (24 HR)
                  <br />
                  Example: 1545
                </label>
                <input
                  onChange={inputChangeHandler}
                  value={showData.endTime}
                  name='endTime'
                  id='endTime'
                  type='number'
                  min='0'
                  max='2400'
                ></input>
              </div>
              <div className={classes.control}>
                <label htmlFor='stage'>Stage</label>
                <select
                  onChange={inputChangeHandler}
                  value={showData.stage}
                  name='stage'
                  id='stage'
                >
                  <option value='N/A'>N/A</option>
                  <option value='What Stage'>What Stage</option>
                  <option value='Which Stage'>Which Stage</option>
                  <option value='This Tent'>This Tent</option>
                  <option value='That Tent'>That Tent</option>
                  <option value='The Other Stage'>The Other Stage</option>
                </select>
              </div>
              <div className={classes.actions}>
                <Button onClick={submitHandler}>save changes</Button>
              </div>
            </Card>
          </div>
        </form>
      )}
    </>
  )
}
