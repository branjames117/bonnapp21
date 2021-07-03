import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Spinner from '../layout/Spinner'
import randomColorGenerator from '../../lib/random-colors'
import { useState, useEffect, useCallback } from 'react'

export default function Excited(props) {
  const [session, loadingSession] = useSession()
  const [excitedUsers, setExcitedUsers] = useState([])
  const [loading, setLoading] = useState(false)

  async function onAddExcitedUser() {
    setLoading(true)
    const excitedData = {
      user: 'admin',
      show: props.show.title,
    }

    const response = await fetch('/api/show/edit-excited-users', {
      method: 'POST',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setExcitedUsers(data.excitedUsers)
    setLoading(false)
  }

  async function onDeleteExcitedUser() {
    setLoading(true)
    const excitedData = {
      user: 'admin',
      show: props.show.title,
    }

    const response = await fetch('/api/show/edit-excited-users', {
      method: 'DELETE',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    setExcitedUsers(data.excitedUsers)
    setLoading(false)
  }

  useEffect(async () => {
    setLoading(true)
    const response = await fetch('/api/show/get-excited-users', {
      method: 'POST',
      body: JSON.stringify({ show: props.show.title }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    setExcitedUsers(data.excitedUsers)
    setLoading(false)
  }, [])

  return (
    <Card>
      <h2 style={{ color: randomColorGenerator() }}>Who's Going?</h2>
      {loading && <Spinner />}
      {!loading && session && !excitedUsers.includes(session.user.name) && (
        <p>
          <Button onClick={onAddExcitedUser}>i'll be there</Button>
        </p>
      )}
      {!loading && session && excitedUsers.includes(session.user.name) && (
        <p>
          <Button onClick={onDeleteExcitedUser}>on second thought...</Button>
        </p>
      )}
      {!session && !loadingSession && (
        <p>
          <Link href='/login'>Log in</Link> to add your name to the list!
        </p>
      )}
      {!loading && (
        <div>
          <div>
            <ul>
              {excitedUsers.map((user) => (
                <li key={user}>
                  <Link href={`/user/${user}`}>{user}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  )
}
