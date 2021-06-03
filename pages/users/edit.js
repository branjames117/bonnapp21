/* Secret admin page for uploading show documents to the db */

import { useRouter } from 'next/router'
import EditProfile from '../../components/users/EditProfile'
import Main from '../../components/layout/Main'
import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../lib/db'

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

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
  const router = useRouter()

  async function editProfileHandler(profileData) {
    const response = await fetch('/api/user/edit-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)

    /* send us back to our profile after we hit submit */
    router.push(`/users/${props.user.username}`)
  }

  return (
    <Main>
      <EditProfile user={props.user} onUserProfileEdit={editProfileHandler} />
    </Main>
  )
}
