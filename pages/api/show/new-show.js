import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

/* API call handler for adding new shows to db */

export default async function handler(req, res) {
  /* if someone tries to access API without active session, they
  may be trying to hack my API, so boot em! */
  const session = await getSession({ req })
  if (!session) res.status(401).json({ message: 'No active session found.' })
  if (session.user.name !== 'admin')
    res.status(401).json({ message: 'Access restricted to admin users.' })

  if (req.method === 'POST') {
    const {
      title,
      displayTitle,
      genres,
      bio,
      wiki,
      site,
      videos,
      day,
      startTime,
      endTime,
      stage,
    } = req.body

    const client = await connectToDatabase()
    if (!client) {
      res.status(503).json({
        message: 'Unable to access database.',
      })
      client.close()
      return
    }
    const db = client.db()
    const showsCollection = db.collection('shows')

    const newShow = {
      title,
      displayTitle,
      genres: genres.toLowerCase().split(','), // split the genres into an array
      bio,
      wiki,
      site,
      day,
      startTime,
      endTime,
      stage,
      videos: videos.split(','), // split the video URLs into an array
      excitedUsers: [], // initialize empty array for interested users
      comments: [], // initialize empty array for comments
    }

    await showsCollection.insertOne(newShow)

    client.close()

    res.status(201).json({ message: 'Show inserted.' })
  }
}
