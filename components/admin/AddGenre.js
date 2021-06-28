import { useRef } from 'react'
import { useRouter } from 'next/router'
import Button from '../layout/Button'
import Card from '../layout/Card'

/* this component will only ever be visible to the admin account, so won't do much by way of validation for the inputs */

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
    <div className='singularContainer'>
      <Card color='rgb(215, 88, 231)'>
        <h2>Add New Genre</h2>
        <form onSubmit={submitHandler}>
          <div className='control'>
            <label htmlFor='name'>Genre Name</label>
            <input
              autoComplete='off'
              type='text'
              required
              name='name'
              id='name'
              ref={genreNameInputRef}
            />
          </div>
          <div className='control'>
            <label htmlFor='def'>Def</label>
            <textarea
              autoComplete='off'
              required
              id='def'
              name='def'
              rows='8'
              ref={genreDefInputRef}
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
          <Button onClick={submitHandler}>upload genre data</Button>
        </form>
      </Card>
    </div>
  )
}
