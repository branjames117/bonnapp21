import { getSession } from 'next-auth/client'
import Main from '../../components/layout/Main'
import LoginUser from '../../components/auth/LoginUser'

export default function LoginPage() {
  return (
    <Main>
      <LoginUser />
    </Main>
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
