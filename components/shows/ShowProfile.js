import { useContext } from 'react'
import { ThemeContext } from '../layout/ThemeContext'
import Main from './Main'
import Excited from './Excited'
import Card from '../layout/Card'
import Comments from '../auth/Comments'
import Video from './Video'
import randomImageGenerator from '../../lib/random-images'
import { useEffect } from 'react'

export default function ShowProfile(props) {
  const { darkTheme } = useContext(ThemeContext)
  /* upon visiting the show's profile, clear out any notifications that user might have for that show's comment section */
  useEffect(async () => {
    await fetch('/api/user/notifs', {
      method: 'PATCH',
      body: JSON.stringify(props.show.title),
      headers: { 'Content-Type': 'application/json' },
    })
  }, [])
  return (
    <>
      {/* LEFT-SIDE PANE */}
      <div>
        <Main show={props.show} />
        <Excited show={props.show} />
        <span className='hider'>
          <Card>{randomImageGenerator(darkTheme)}</Card>
        </span>
      </div>
      {/* RIGHT-SIDE PANE */}
      <div>
        <Video videos={props.show.videos} />
        <Comments _id={props.show._id} />
      </div>
    </>
  )
}
