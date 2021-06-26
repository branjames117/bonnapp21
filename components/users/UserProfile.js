import { useSession } from 'next-auth/client'
import classes from './UserProfile.module.css'
import Card from '../layout/Card'
import Main from './Main'
import Notifications from './Notifications'
import Excited from './Excited'
import Friends from './Friends'
import Comments from '../auth/Comments'
import Video from './Video'
import randomImageGenerator from '../../lib/random-images'

export default function UserProfile(props) {
  const [session, loading] = useSession()

  /* logic to determine profile ownership */
  /* does session exist? is session user same as profile user? */
  let myPage =
    session && session.user.name === props.user.username ? true : false

  return (
    <>
      {session && loading && <p>Loading profile from database...</p>}
      {!loading && (
        <>
          {/* LEFT-SIDE PANE */}
          <div>
            <Main user={props.user} myPage={myPage} />
            <Excited
              username={props.user.username}
              myPage={myPage}
              excited={props.user.excited}
            />
            {/* Only show this card if Friends is enabled */}
            {props.user.friendsEnabled === 'true' && (
              <Friends user={props.user} session={session} myPage={myPage} />
            )}
            {/* Only show this card if user is on own profile */}
            {myPage && <Notifications />}
            <span className={classes.hider}>
              <Card>{randomImageGenerator()}</Card>
            </span>
          </div>

          {/* RIGHT-SIDE PANE */}
          <div>
            {props.user.videoURL && <Video videoURL={props.user.videoURL} />}
            {/* only show this card if Comments is enabled */}

            {props.user.commentsEnabled === 'true' && (
              <Comments _id={props.user._id} />
            )}
          </div>
        </>
      )}
    </>
  )
}
