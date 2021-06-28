import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
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
      <h2 style={{ color: randomColorGenerator() }}>Following</h2>
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
      <div>
        {props.myPage && props.user.friends.length === 0 && (
          <p>You're not following anyone yet!</p>
        )}
        {!props.myPage && props.user.friends.length === 0 && (
          <p>
            They're not following anyone yet! Drop them a comment and tell them
            to follow you!
          </p>
        )}
        {props.user.friends.length !== 0 && (
          <ul>
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
        {props.myPage && (
          <p>
            <Link href={'/random-user'}>Here's someone at random!</Link>
          </p>
        )}
      </div>
    </Card>
  )
}
