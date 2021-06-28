import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Bio from './Bio'
import randomColorGenerator from '../../lib/random-colors'

export default function Main(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <Card>
      <h1 style={{ color: randomColorGenerator() }}>{props.user.username}</h1>
      {props.myPage && (
        <Button onClick={() => router.push('/edit')}>edit profile</Button>
      )}
      {props.myPage && session.user.name === 'admin' && (
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
      <Bio user={props.user} />
    </Card>
  )
}
