import { getSession } from 'next-auth/client'
import LoginUser from '../../components/users/LoginUser'
import Main from '../../components/layout/Main'

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return { redirect: { destination: `/users/${session.user.name}` } }
  }

  return {
    props: {},
  }
}

export default function Login() {
  return (
    <Main>
      <LoginUser />
    </Main>
  )
}
