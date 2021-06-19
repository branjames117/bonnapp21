import Grid from '../../components/layout/Grid'
import UserProfile from '../../components/users/UserProfile'
import { connectToDatabase } from '../../lib/db'

export default function UserPage(props) {
  return (
    <Grid>
      <UserProfile user={props.user} />
    </Grid>
  )
}

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()
  const requestedUser = context.params.userName

  const users = db.collection('users')

  /* use the dynamic page URL to choose which username to pull from db */
  const fetchedUser = await users.findOne({
    username: requestedUser,
  })
  client.close()

  /* use rest operator to separate out the password key */
  const { password, ...user } = fetchedUser
  /* then convert the _id key to a string so we can use it as a prop */
  user._id += ''
  return {
    props: {
      user,
    },
    revalidate: 1,
  }
}

/* go over each item in the database to generate static page paths for each user */
export async function getStaticPaths() {
  const client = await connectToDatabase()
  const db = client.db()

  const usersCollection = db.collection('users')

  const fetchedUsers = await usersCollection
    .find({}, { projection: { username: 1, _id: 0 } })
    .toArray()

  const paths = fetchedUsers.map((user) => ({
    params: { userName: user.username },
  }))

  client.close()

  return {
    paths,
    fallback: false,
  }
}
