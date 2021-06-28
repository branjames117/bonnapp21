import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Card from '../layout/Card'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

export default function EditShow(props) {
  const [session, _] = useSession()
  const router = useRouter()

  const [genreData, setGenreData] = useState({
    name: '',
    def: '',
    wiki: '',
  })

  const [errors, setErrors] = useState({
    def: false,
    wiki: false,
  })

  /* use pre-existing info to fill out form on first load */
  useEffect(() => {
    setGenreData({
      name: props.genre.name,
      def: props.genre.def,
      wiki: props.genre.wiki,
    })
  }, [])

  /* switch case input change handler updates the showData
  state and also resets appropriate error states */
  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case 'def':
        setGenreData((prevState) => ({
          ...prevState,
          def: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          def: false,
        }))
        break
      case 'wiki':
        setGenreData((prevState) => ({
          ...prevState,
          wiki: e.target.value,
        }))
        setErrors((prevState) => ({
          ...prevState,
          wiki: false,
        }))
        break
    }
  }

  async function submitHandler(e) {
    e.preventDefault()
    let validForm = true

    if (genreData.def.trim() === '' || genreData.def.trim().length > 1000) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        def: true,
      }))
    }

    if (genreData.wiki.trim() === '' || genreData.wiki.trim().length > 100) {
      validForm = false
      setErrors((prevState) => ({
        ...prevState,
        wiki: true,
      }))
    }

    /* if any validations failed, break out of submit handler */
    if (!validForm) return

    await fetch('/api/genre/edit-genre', {
      method: 'POST',
      body: JSON.stringify({
        ...genreData,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    /* send us back to our show after we hit submit */
    router.push(`/genres/${props.genre.name}`)
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
        <div className='singularContainer'>
          <Card>
            <form onSubmit={submitHandler}>
              {/* LEFT-SIDE PANE */}
              <div>
                <BigHeadline style={{ color: randomColorGenerator() }}>
                  {props.genre.name} Profile Editor
                </BigHeadline>
                <div>
                  <Headline style={{ color: randomColorGenerator() }}>
                    <label htmlFor='def'>Definition</label>
                  </Headline>
                  <div className='control'>
                    <textarea
                      onChange={inputChangeHandler}
                      value={genreData.def}
                      name='def'
                      id='def'
                      rows='8'
                      className={errors.def ? 'controlError' : null}
                    ></textarea>
                  </div>
                  {errors.def && (
                    <p className='error'>
                      Definition must be below 1,000 characters.
                    </p>
                  )}
                  <div className='control'>
                    <label htmlFor='wiki'>URL Source for Definition</label>
                    <input
                      onChange={inputChangeHandler}
                      value={genreData.wiki}
                      autoComplete='off'
                      name='wiki'
                      id='wiki'
                      type='text'
                      className={errors.site ? 'controlError' : null}
                    />
                  </div>
                  {errors.wiki && (
                    <p className='error'>
                      Definition source URL must be below 100 characters.
                    </p>
                  )}
                  <Button onClick={submitHandler}>save changes</Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}
