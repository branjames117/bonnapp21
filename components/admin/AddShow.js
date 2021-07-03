import { useRef } from 'react'
import { useRouter } from 'next/router'
import Button from '../layout/Button'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account */

export default function AddShow() {
  const showTitleInputRef = useRef()
  const displayTitleInputRef = useRef()
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
    const enteredDisplayTitle = displayTitleInputRef.current.value
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
      displayTitle: enteredDisplayTitle,
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

    await fetch('/api/show/new-show', {
      method: 'POST',
      body: JSON.stringify(showData),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to root after we hit submit */
    router.push(`/shows/${enteredTitle}`)
  }

  return (
    <div className='singularContainer'>
      <Card color='rgb(215, 88, 231)'>
        <h2>Add Show</h2>
        <form onSubmit={submitHandler}>
          <div className='control'>
            <label htmlFor='title'>Show Name</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='title'
              name='title'
              ref={showTitleInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='displayTitle'>Display Name</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='displayTitle'
              name='displayTitle'
              ref={displayTitleInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='site'>Official Site URL</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='site'
              name='site'
              ref={siteInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='genres'>Genres (separate by comma)</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='genres'
              name='genres'
              ref={showGenresInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='bio'>Bio</label>
            <textarea
              autoComplete='off'
              required
              id='bio'
              name='bio'
              rows='10'
              ref={showBioInputRef}
            ></textarea>
          </div>
          <div className='control'>
            <label htmlFor='wiki'>Wikipedia URL</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='wiki'
              name='wiki'
              ref={wikiInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='videos'>Video URLs (separate by comma)</label>
            <input
              autoComplete='off'
              type='text'
              required
              id='videos'
              name='videos'
              ref={showVideosInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='day'>Day</label>
            <select ref={dayInputRef} name='day' id='day'>
              <option value='N/A'>N/A</option>
              <option value='Thursday'>Thursday</option>
              <option value='Friday'>Friday</option>
              <option value='Saturday'>Saturday</option>
              <option value='Sunday'>Sunday</option>
            </select>
          </div>
          <div className='control'>
            <label htmlFor='startTime'>
              Start Time (24 HR)
              <br />
              Example: 1500
            </label>
            <input
              autoComplete='off'
              ref={startTimeInputRef}
              name='startTime'
              id='startTime'
              type='number'
              min='0'
              max='2400'
            ></input>
          </div>
          <div className='control'>
            <label htmlFor='endTime'>
              End Time (24 HR)
              <br />
              Example: 1545
            </label>
            <input
              autoComplete='off'
              ref={endTimeInputRef}
              name='endTime'
              id='endTime'
              type='number'
              min='0'
              max='2400'
            ></input>
          </div>
          <div className='control'>
            <label htmlFor='stage'>Stage</label>
            <select ref={stageInputRef} name='stage' id='stage'>
              <option value='N/A'>N/A</option>
              <option value='What Stage'>What Stage</option>
              <option value='Which Stage'>Which Stage</option>
              <option value='Who Stage'>Who Stage</option>
              <option value='This Tent'>This Tent</option>
              <option value='That Tent'>That Tent</option>
              <option value='The Other Stage'>The Other Stage</option>
            </select>
          </div>
          <Button onClick={submitHandler}>upload show data</Button>
        </form>
      </Card>
    </div>
  )
}
