import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './UserProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Bio from './Bio'
import Social from './Social'
import Excited from './Excited'
import Friends from './Friends'
import Comments from './Comments'
import Video from './Video'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function UserProfile(props) {
  const [session, loading] = useSession()
  const router = useRouter()

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
          <div className={classes.gridLeft}>
            <Card>
              <h1
                className={classes.h1}
                style={{ color: randomColorGenerator() }}
              >
                {props.user.username}
              </h1>
              {myPage && (
                <Button onClick={() => router.push('/users/edit')}>
                  edit profile
                </Button>
              )}
              {myPage && session.user.name === 'admin' && (
                <>
                  <br />
                  <Button onClick={() => router.push('/admin/show')}>
                    add show to db
                  </Button>
                  <br />
                  <Button onClick={() => router.push('/admin/genre')}>
                    add genre to db
                  </Button>
                </>
              )}
              <div className={classes.body}>
                <Bio user={props.user} />
                <Social
                  facebookURL={props.user.facebookURL}
                  instaURL={props.user.instaURL}
                  twitterURL={props.user.twitterURL}
                />
                <Excited
                  username={props.user.username}
                  myPage={myPage}
                  excited={props.user.excited}
                />
              </div>
            </Card>
            {/* Only show this card if Friends is enabled */}
            {props.user.friendsEnabled === 'true' && (
              <>
                <Card>
                  <Friends
                    user={props.user}
                    session={session}
                    myPage={myPage}
                  />
                </Card>
              </>
            )}
            <Card>{randomImageGenerator()}</Card>
          </div>

          {/* MIDDLE-SIDE PANE */}
          <div className={classes.gridMid}>
            {props.user.videoURL && (
              <Card>
                <Video videoURL={props.user.videoURL} />
              </Card>
            )}
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
