import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
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
      <h2 style={{ color: randomColorGenerator() }}>Going to See</h2>
      <div>
        {(props.excited.length === 0 && (
          <>
            {props.myPage && (
              <p>
                Your list is empty!{' '}
                <Link href={'/random-show'}>Want a random suggestion?</Link>
              </p>
            )}
            {!props.myPage && (
              <p>
                Their list is empty! Leave them a comment and make a
                recommendation.
              </p>
            )}
          </>
        )) || (
          <ul>
            {props.excited.map((show) => (
              <li key={show}>
                {props.myPage && (
                  <SmallButton onClick={() => onDeleteExcitedUser(show)}>
                    x
                  </SmallButton>
                )}
                <Link href={`/shows/${show}`}>{show}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
