import { useRef } from 'react'
import { useRouter } from 'next/router'
import Button from '../layout/Button'
import classes from './AddShow.module.css'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account */

export default function AddGenre() {
  const genreNameInputRef = useRef()
  const genreDefInputRef = useRef()
  const wikiInputRef = useRef()
  const router = useRouter()

  async function submitHandler(e) {
    e.preventDefault()

    const enteredName = genreNameInputRef.current.value
    const enteredDef = genreDefInputRef.current.value
    const enteredWiki = wikiInputRef.current.value

    const genreData = {
      name: enteredName,
      def: enteredDef,
      wiki: enteredWiki,
    }

    await fetch('/api/genre/new-genre', {
      method: 'POST',
      body: JSON.stringify(genreData),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to root after we hit submit */
    router.push(`/genres/${enteredName}`)
  }

  return (
    <Card color='rgb(215, 88, 231)'>
      <h2>Add Genre</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Genre Name</label>
          <input type='text' required id='name' ref={genreNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='def'>Def</label>
          <textarea
            required
            id='def'
            rows='8'
            ref={genreDefInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='wiki'>Wikipedia URL</label>
          <input type='text' required id='wiki' ref={wikiInputRef} />
        </div>
        <div className={classes.actions}>
          <Button onClick={submitHandler}>upload genre data</Button>
        </div>
      </form>
    </Card>
  )
}
