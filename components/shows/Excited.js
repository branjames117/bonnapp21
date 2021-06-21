import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classes from './Excited.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

export default function Excited(props) {
  const [session, _] = useSession()
  const router = useRouter()

  async function onAddExcitedUser() {
    const excitedData = {
      user: session.user.name,
      show: props.show.title,
    }

    await fetch('/api/show/edit-excited', {
      method: 'POST',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    router.push(props.show.title)
  }

  async function onDeleteExcitedUser(show = props.show.title) {
    const excitedData = {
      user: session.user.name,
      show: props.show.title,
    }

    await fetch('/api/show/edit-excited', {
      method: 'DELETE',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    router.push(props.show.title)
  }

  return (
    <Card>
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        Who's Excited?
      </h2>
      {session && !props.show.excitedUsers.includes(session.user.name) && (
        <Button onClick={onAddExcitedUser}>I'm Excited!</Button>
      )}
      {session && props.show.excitedUsers.includes(session.user.name) && (
        <Button onClick={onDeleteExcitedUser}>Actually, I'll Pass!</Button>
      )}
      {!session && <p>Log in to add your name to the list!</p>}
      <div className={classes.body}>
        {props.show.excitedUsers.length === 0 && (
          <span className={classes.box}>No one yet.</span>
        )}
        <div className={classes.listSplitter}>
          <div>
            {props.show.excitedUsers.map((user, idx) =>
              idx % 2 === 0 ? (
                <p key={user}>
                  <Link href={`/users/${user}`}>{user}</Link>
                </p>
              ) : null
            )}
          </div>
          <div>
            {props.show.excitedUsers.map((user, idx) =>
              idx % 2 !== 0 ? (
                <p key={user}>
                  <Link href={`/users/${user}`}>{user}</Link>
                </p>
              ) : null
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
