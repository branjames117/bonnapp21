import { connectToDatabase } from '../lib/db'

/* the /random page route; no need to render an actual page, just
sending the user to a random /show route */

export default function RandomUser() {
  return <p>Loading randomness...</p>
}

export async function getServerSideProps() {
  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return { redirect: { destination: '/' } }
  }
  const db = client.db()

  const usersCollection = db.collection('users')

  const fetchedUsers = await usersCollection
    .find({}, { projection: { username: 1, _id: 0 } })
    .toArray()
  const randomUserIndex = Math.floor(Math.random() * fetchedUsers.length)
  const randomUser = fetchedUsers[randomUserIndex].username

  client.close()

  return { redirect: { destination: `/user/${randomUser}` } }
}
