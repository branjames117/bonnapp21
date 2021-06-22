import Head from 'next/head'
import Grid from '../../components/layout/Grid'
import UserProfile from '../../components/users/UserProfile'
import { connectToDatabase } from '../../lib/db'

export default function UserPage(props) {
  return (
    <Grid>
      <Head>
        <title>BonnApp21 - {props.user.username}'s Profile</title>
        <meta
          name='description'
          content={`${props.user.username} is going to Bonnaroo 2021!`}
        />
      </Head>
      <UserProfile user={props.user} />
    </Grid>
  )
}

export async function getServerSideProps(context) {
  console.log('Connecting to database')
  const client = await connectToDatabase()
  if (!client) {
    console.log('Database connection failed')
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return {
      notFound: true,
    }
  }
  const db = client.db()
  const requestedUser = context.params.userName
  console.log(requestedUser)

  const usersCollection = db.collection('users')
  console.log(usersCollection)
  const users = await usersCollection(find({}))
  console.log(users)

  /* use the dynamic page URL to choose which username to pull from db */
  const fetchedUser = await usersCollection.findOne({
    username: requestedUser,
  })
  console.log(fetchedUser)

  client.close()

  if (!fetchedUser) {
    console.log('User not found in database')
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return {
      notFound: true,
    }
  }

  /* use rest operator to separate out the password key */
  const { password, ...user } = fetchedUser
  /* then convert the _id key to a string so we can use it as a prop */
  user._id += ''
  return {
    props: {
      user,
    },
  }
}
