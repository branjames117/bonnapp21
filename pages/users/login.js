import { getSession } from 'next-auth/client'
import Login from '../../components/auth/Login'

export default function LoginPage() {
  return (
    <div style={{ flex: 1 }}>
      <Login />
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* redirect to profile if user is already authorized */
  if (session) {
    return { redirect: { destination: `/users/${session.user.name}` } }
  }

  return {
    props: {},
  }
}
