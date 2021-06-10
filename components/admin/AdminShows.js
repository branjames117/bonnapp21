import { useRef } from 'react'
import styles from './AdminShows.module.css'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account */

export default function AdminShows(props) {
  const showTitleInputRef = useRef()
  const showGenresInputRef = useRef()
  const showBioInputRef = useRef()
  const siteInputRef = useRef()
  const wikiInputRef = useRef()
  const showVideosInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    const enteredTitle = showTitleInputRef.current.value
    const enteredGenres = showGenresInputRef.current.value
    const enteredBio = showBioInputRef.current.value
    const enteredWiki = wikiInputRef.current.value
    const enteredSite = siteInputRef.current.value
    const enteredVideos = showVideosInputRef.current.value

    const showData = {
      title: enteredTitle,
      genres: enteredGenres,
      bio: enteredBio,
      site: enteredSite,
      wiki: enteredWiki,
      videos: enteredVideos,
    }

    props.onAddShow(showData)
  }

  return (
    <>
      <Card color='rgb(215, 88, 231)'>
        <h2>Add Show</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor='title'>Show Name</label>
            <input type='text' required id='title' ref={showTitleInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='site'>Official Site URL</label>
            <input type='text' required id='site' ref={siteInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='genres'>Genres (comma separated)</label>
            <input type='text' required id='genres' ref={showGenresInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='bio'>Bio</label>
            <textarea
              required
              id='bio'
              rows='3'
              ref={showBioInputRef}
            ></textarea>
          </div>
          <div className={styles.control}>
            <label htmlFor='wiki'>Wikipedia URL</label>
            <input type='text' required id='wiki' ref={wikiInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='videos'>Video URLs (comma separated)</label>
            <input type='text' required id='videos' ref={showVideosInputRef} />
          </div>
          <div className={styles.actions}>
            <button>Add Show</button>
          </div>
        </form>
      </Card>
    </>
  )
}
