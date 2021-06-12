import { getSession } from 'next-auth/client'
import Main from '../../components/layout/Main'
import RegisterUser from '../../components/auth/RegisterUser'
import { connectToDatabase } from '../../lib/db'

export default function RegisterPage({ users }) {
  return (
    <Main>
      <RegisterUser users={users} />
    </Main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* redirect to profile if user is already authorized */
  if (session) {
    return { redirect: { destination: `/users/${session.user.name}` } }
  }

  const client = await connectToDatabase()
  const db = client.db()

  /* get list of all users and send as prop */
  const usersCollection = db.collection('users')
  const usersArray = await usersCollection.find({}, { username: 1 }).toArray()
  const users = usersArray.map((user) => user.username)

  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      users,
    },
  }
}
