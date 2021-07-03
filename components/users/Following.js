import Link from 'next/link'
import { useSession } from 'next-auth/client'
import Card from '../layout/Card'
import Button from '../layout/Button'
import SmallButton from '../layout/SmallButton'
import Spinner from '../layout/Spinner'
import randomColorGenerator from '../../lib/random-colors'
import { useEffect, useState } from 'react'

export default function Following(props) {
  const [session, _] = useSession()
  const [friends, setFriends] = useState([])
  const [friendOf, setFriendOf] = useState([])
  const [loading, setLoading] = useState(false)

  /* on component load, fetch the profile user's friends */
  useEffect(async () => {
    setLoading(true)

    const response = await fetch('/api/user/following', {
      method: 'POST',
      body: JSON.stringify({ username: props.user.username }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    setFriends(data.friendsList)
    setFriendOf(data.friendOfList)
    setLoading(false)
    /* set props as dependency so useEffect reruns on each different profile */
  }, [props])

  /* on adding new friend, we only need to update the friendOf list, since the user whose page we are on, their friends list doesn't change at all */
  async function onAddFriend() {
    setLoading(true)

    const friendData = {
      username: session.user.name,
      friend: props.user.username,
    }

    const response = await fetch('/api/user/following', {
      method: 'PATCH',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    setFriendOf(data.friendOfList)
    setLoading(false)
    return
  }

  async function onDeleteFriend(e) {
    e.preventDefault()
    setLoading(true)
    /* the friend to delete is either the specific target of the button (if X
      pressed on user's profile OR the user whose profile we are on */
    const friend = e.target.value || props.user.username

    const friendData = {
      username: session.user.name,
      friend,
    }

    const response = await fetch('/api/user/following', {
      method: 'DELETE',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    setFriends(data.friendsList)
    setFriendOf(data.friendOfList)
    setLoading(false)
    return
  }

  return (
    <Card>
      <h2 style={{ color: randomColorGenerator() }}>Following</h2>
      {loading && <Spinner />}
      {!loading && (
        <>
          {session && !props.myPage && !friendOf.includes(session.user.name) && (
            <p>
              <Button onClick={onAddFriend}>follow them!</Button>
            </p>
          )}
          {session && !props.myPage && friendOf.includes(session.user.name) && (
            <p>
              <Button onClick={onDeleteFriend}>unfollow them!</Button>
            </p>
          )}
          <div>
            {props.myPage && friends.length === 0 && (
              <p>You're not following anyone yet!</p>
            )}
            {!props.myPage && friends.length === 0 && (
              <p>They're not following anyone yet!</p>
            )}
            {
              <ul>
                {friends.map((friend, idx) => (
                  <li key={idx}>
                    {props.myPage && (
                      <SmallButton value={friend} onClick={onDeleteFriend}>
                        x
                      </SmallButton>
                    )}
                    <Link href={`/user/${friend}`}>{friend}</Link>
                  </li>
                ))}
              </ul>
            }
            <p>
              <Link href={'/random-user'}>Find a random Bonnaroovian.</Link>
            </p>
          </div>
        </>
      )}
    </Card>
  )
}
