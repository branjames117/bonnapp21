import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../lib/db'
import EditProfile from '../../components/users/EditProfile'

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* redirect if user has no active session and therefore
  no profile page to edit */
  if (!session) {
    return { redirect: { destination: '/users/login' } }
  }

  const client = await connectToDatabase()
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

export default function EditProfilePage(props) {
  return (
    <div style={{ flex: 1 }}>
      <EditProfile user={props.user} />
    </div>
  )
}
