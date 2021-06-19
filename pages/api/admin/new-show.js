import { connectToDatabase } from '../../../lib/db'

/* API call handler for adding new shows to db */

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, genres, bio, wiki, site, videos } = req.body

    const client = await connectToDatabase()
    const db = client.db()
    const showsCollection = db.collection('shows')

    const newShow = {
      title,
      genres: genres.split(', '), // split the genres into an array
      bio,
      wiki,
      site,
      videos: videos.split(', '), // split the video URLs into an array
      excitedUsers: [], // initialize empty array for interested users
      comments: [], // initialize empty array for comments
    }

    await showsCollection.insertOne(newShow)

    client.close()

    res.status(201).json({ message: 'Show inserted.' })
  }
}
