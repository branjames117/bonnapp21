import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import classes from './Notifications.module.css'
import Button from '../layout/Button'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'

export default function Notifications() {
  const [session, _] = useSession()
  const [notifs, setNotifs] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    const response = await fetch('/api/user/get-notifs')
    const data = await response.json()
    setNotifs(data.notifs)
    setLoading(false)
  }, [])

  async function onClearNotifications() {
    const response = await fetch('/api/user/get-notifs', {
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
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        New Comments {!loading && <span>({notifsTotal})</span>}
      </h2>
      {notifsTotal > 0 && (
        <Button onClick={onClearNotifications}>clear notifications</Button>
      )}
      <div className={classes.body}>
        {Object.keys(notifs).map((key, idx) => (
          <ul className={classes.ul}>
            <li key={key}>
              {notifs[key]} new{' '}
              {notifs[key] === 1 ? (
                <span>comment </span>
              ) : (
                <span>comments </span>
              )}
              on{' '}
              {key !== session.user.name ? (
                <Link href={`/shows/${key}`}>{key}</Link>
              ) : (
                <span>your profile.</span>
              )}
            </li>
          </ul>
        ))}
      </div>
    </Card>
  )
}
