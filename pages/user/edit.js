import Head from 'next/head'
import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../lib/db'
import EditProfile from '../../components/users/EditProfile'

export default function EditProfilePage(props) {
  return (
    <div style={{ flex: 1 }}>
      <Head>
        <title>BonnApp21 - {props.user.username}'s Profile Editor</title>
      </Head>
      <EditProfile user={props.user} />
    </div>
  )
}

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* redirect if user has no active session and therefore
  no profile page to edit */
  if (!session) {
    return { redirect: { destination: '/user/login' } }
  }

  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return
  }
  const db = client.db()
  const users = db.collection('users')

  const fetchedUser = await users.findOne({
    username: session.user.name,
  })

  /* use rest operator to separate out the _id and password keys we don't
  need to pass as props: user is all we care about now */
  const { _id, password, ...user } = fetchedUser

  client.close()

  return {
    props: {
      user,
    },
  }
}
