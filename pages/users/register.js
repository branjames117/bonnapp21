import Head from 'next/head'
import { getSession } from 'next-auth/client'
import Register from '../../components/auth/Register'

export default function RegisterPage() {
  return (
    <div style={{ flex: 1 }}>
      <Head>
        <title>BonnApp21 - Register</title>
      </Head>
      <Register />
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
