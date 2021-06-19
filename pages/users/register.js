import { getSession } from 'next-auth/client'
import Register from '../../components/auth/Register'

export default function RegisterPage({ users }) {
  return (
    <div style={{ flex: 1 }}>
      <Register users={users} />
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
