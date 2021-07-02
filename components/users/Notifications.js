import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Button from '../layout/Button'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'

export default function Notifications() {
  const [session, _] = useSession()
  const [notifs, setNotifs] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    const response = await fetch('/api/user/notifs')
    const data = await response.json()
    setNotifs(data.notifs)
    setLoading(false)
  }, [])

  async function onClearNotifications() {
    const response = await fetch('/api/user/notifs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    setNotifs(data.notifs)
  }

  let notifsTotal = 0
  Object.keys(notifs).map((key) => {
    notifsTotal += notifs[key]
  })

  return (
    <Card>
      <h2 style={{ color: randomColorGenerator() }}>
        Comment Notifications {!loading && <span>({notifsTotal})</span>}
      </h2>
      {notifsTotal > 0 && (
        <p>
          <Button onClick={onClearNotifications}>clear notifications</Button>
        </p>
      )}
      <div>
        {Object.keys(notifs).map((key) => (
          <ul>
            <li key={key}>
              {notifs[key]} new{' '}
              {notifs[key] === 1 ? <>comment </> : <>comments </>}
              on{' '}
              {key !== session.user.name ? (
                <Link href={`/shows/${key}`}>{key}</Link>
              ) : (
                <>your profile.</>
              )}
            </li>
          </ul>
        ))}
      </div>
    </Card>
  )
}
