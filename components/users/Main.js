import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Card from '../layout/Card'
import Button from '../layout/Button'
import BigHeadline from '../layout/BigHeadline'
import Bio from './Bio'

export default function Main(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <Card>
      <BigHeadline>{props.user.username}</BigHeadline>
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
