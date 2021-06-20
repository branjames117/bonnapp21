import { useRef } from 'react'
import { useRouter } from 'next/router'
import Button from '../layout/Button'
import classes from './AddShow.module.css'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account */

export default function AddShow() {
  const showTitleInputRef = useRef()
  const showGenresInputRef = useRef()
  const showBioInputRef = useRef()
  const siteInputRef = useRef()
  const wikiInputRef = useRef()
  const showVideosInputRef = useRef()
  const dayInputRef = useRef()
  const startTimeInputRef = useRef()
  const endTimeInputRef = useRef()
  const stageInputRef = useRef()

  const router = useRouter()

  async function submitHandler(e) {
    e.preventDefault()

    const enteredTitle = showTitleInputRef.current.value
    const enteredGenres = showGenresInputRef.current.value
    const enteredBio = showBioInputRef.current.value
    const enteredWiki = wikiInputRef.current.value
    const enteredSite = siteInputRef.current.value
    const enteredVideos = showVideosInputRef.current.value
    const enteredDay = dayInputRef.current.value
    const enteredStartTime = startTimeInputRef.current.value
    const enteredEndTime = endTimeInputRef.current.value
    const enteredStage = stageInputRef.current.value

    const showData = {
      title: enteredTitle,
      genres: enteredGenres,
      bio: enteredBio,
      site: enteredSite,
      wiki: enteredWiki,
      videos: enteredVideos,
      day: enteredDay,
      startTime: enteredStartTime,
      endTime: enteredEndTime,
      stage: enteredStage,
    }

    await fetch('/api/admin/new-show', {
      method: 'POST',
      body: JSON.stringify(showData),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to root after we hit submit */
    router.push(`/shows/${enteredTitle}`)
  }

  return (
    <>
      <Card color='rgb(215, 88, 231)'>
        <h2>Add Show</h2>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Show Name</label>
            <input type='text' required id='title' ref={showTitleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='site'>Official Site URL</label>
            <input type='text' required id='site' ref={siteInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='genres'>Genres (separate by comma)</label>
            <input type='text' required id='genres' ref={showGenresInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='bio'>Bio</label>
            <textarea
              required
              id='bio'
              rows='10'
              ref={showBioInputRef}
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='wiki'>Wikipedia URL</label>
            <input type='text' required id='wiki' ref={wikiInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='videos'>Video URLs (separate by comma)</label>
            <input type='text' required id='videos' ref={showVideosInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='day'>Day</label>
            <select ref={dayInputRef} name='day' id='day'>
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
              ref={startTimeInputRef}
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
              ref={endTimeInputRef}
              name='endTime'
              id='endTime'
              type='number'
              min='0'
              max='2400'
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor='stage'>Stage</label>
            <select ref={stageInputRef} name='stage' id='stage'>
              <option value='N/A'>N/A</option>
              <option value='What Stage'>What Stage</option>
              <option value='Which Stage'>Which Stage</option>
              <option value='This Tent'>This Tent</option>
              <option value='That Tent'>That Tent</option>
              <option value='The Other Stage'>The Other Stage</option>
            </select>
          </div>
          <div className={classes.actions}>
            <Button onClick={submitHandler}>upload data</Button>
          </div>
        </form>
      </Card>
    </>
  )
}
