import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import classes from './Excited.module.css'
import Card from '../../components/layout/Card'
import SmallButton from '../layout/SmallButton'
import randomColorGenerator from '../../lib/random-colors'

export default function Excited(props) {
  const [session, loading] = useSession()
  const router = useRouter()

  async function onDeleteExcitedUser(show = props.show.title) {
    const excitedData = {
      user: session.user.name,
      show: show,
    }

    await fetch('/api/show/edit-excited', {
      method: 'DELETE',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    router.push(props.username)
  }

  return (
    <Card>
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        Excited to See
      </h2>
      <div className={classes.body}>
        {(props.excited.length === 0 && <span>No one yet.</span>) || (
          <ul className={classes.ul}>
            {props.excited.map((show) => (
              <li key={show}>
                {props.myPage && (
                  <SmallButton onClick={() => onDeleteExcitedUser(show)}>
                    x
                  </SmallButton>
                )}
                <Link href={`/shows/${show}`}>
                  <a className={classes.box}>{show}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
