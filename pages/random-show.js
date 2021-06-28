import { connectToDatabase } from '../lib/db'

/* the /random page route; no need to render an actual page, just
sending the user to a random /show route */

export default function RandomPage() {
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

  const showsCollection = db.collection('shows')

  const fetchedShows = await showsCollection
    .find({}, { projection: { title: 1, _id: 0 } })
    .toArray()
  const randomShowIndex = Math.floor(Math.random() * fetchedShows.length)
  const randomShow = fetchedShows[randomShowIndex].title

  client.close()

  return { redirect: { destination: `/shows/${randomShow}` } }
}
