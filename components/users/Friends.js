import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './Friends.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import SmallButton from '../layout/SmallButton'
import randomColorGenerator from '../../lib/random-colors'

export default function Friends(props) {
  const [session, loading] = useSession()
  const router = useRouter()

  async function onAddFriend() {
    const friendData = {
      username: session.user.name,
      friendName: props.user.username,
    }

    await fetch('/api/user/edit-friends', {
      method: 'POST',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    router.push(props.user.username)
  }

  async function onDeleteFriend(friend = props.user.username) {
    const friendData = {
      username: session.user.name,
      friendName: friend,
    }

    await fetch('/api/user/edit-friends', {
      method: 'DELETE',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    router.push(props.user.username)
  }

  return (
    <Card>
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        Following
      </h2>
      {props.session &&
        !props.myPage &&
        !props.user.friendOf.includes(session.user.name) && (
          <Button onClick={onAddFriend}>follow them!</Button>
        )}
      {props.session &&
        !props.myPage &&
        props.user.friendOf.includes(session.user.name) && (
          <Button onClick={onDeleteFriend}>unfollow them!</Button>
        )}
      <div className={classes.body}>
        {props.user.friends.length === 0 && <p>No one yet.</p>}
        {props.user.friends.length !== 0 && (
          <ul className={classes.ul}>
            {props.user.friends.map((friend, idx) => (
              <li key={idx}>
                {props.myPage && (
                  <SmallButton onClick={() => onDeleteFriend(friend)}>
                    x
                  </SmallButton>
                )}
                <Link href={`/user/${friend}`}>{friend}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
