import { useRef } from 'react'
import styles from './AdminShows.module.css'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account */

export default function AdminGenres(props) {
  const genreNameInputRef = useRef()
  const genreDefInputRef = useRef()
  const wikiInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    const enteredName = genreNameInputRef.current.value
    const enteredDef = genreDefInputRef.current.value
    const enteredWiki = wikiInputRef.current.value

    const genreData = {
      name: enteredName,
      def: enteredDef,
      wiki: enteredWiki,
    }

    props.onAddGenre(genreData)
  }

  return (
    <>
      <Card color='rgb(215, 88, 231)'>
        <h2>Add Genre</h2>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor='name'>Genre Name</label>
            <input type='text' required id='name' ref={genreNameInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='def'>Def</label>
            <textarea
              required
              id='def'
              rows='5'
              ref={genreDefInputRef}
            ></textarea>
          </div>
          <div className={styles.control}>
            <label htmlFor='wiki'>Wikipedia URL</label>
            <input type='text' required id='wiki' ref={wikiInputRef} />
          </div>
          <div className={styles.actions}>
            <button>Add Genre</button>
          </div>
        </form>
      </Card>
    </>
  )
}
