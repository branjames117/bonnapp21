import { getSession } from 'next-auth/client'
import RegisterUser from '../../components/users/RegisterUser'
import Main from '../../components/layout/Main'
import { connectToDatabase } from '../../lib/db'

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return { redirect: { destination: `/users/${session.user.name}` } }
  }

  const client = await connectToDatabase()
  const db = client.db()

  const usersCollection = db.collection('users')
  const users = await usersCollection.find({}, { username: 1 }).toArray()

  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      users: users.map((user) => user.username),
    },
  }
}

export default function Register(props) {
  return (
    <Main>
      <RegisterUser users={props.users} />
    </Main>
  )
}
