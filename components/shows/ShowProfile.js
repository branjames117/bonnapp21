import classes from './ShowProfile.module.css'
import Main from './Main'
import Excited from './Excited'
import Card from '../layout/Card'
import Comments from '../auth/Comments'
import Video from './Video'
import randomImageGenerator from '../../lib/random-images'
import { useEffect } from 'react'

export default function ShowProfile(props) {
  useEffect(async () => {
    console.log('UseEffect happening')
    const result = await fetch('/api/user/get-notifs', {
      method: 'PATCH',
      body: JSON.stringify(props.show.title),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(result)
  }, [])
  return (
    <>
      {/* LEFT-SIDE PANE */}
      <div>
        <Main show={props.show} />
        <Excited show={props.show} />
        <span className={classes.hider}>
          <Card>{randomImageGenerator()}</Card>
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
