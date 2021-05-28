import { MongoClient } from 'mongodb'
import { connectToDatabase } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
    })

    const db = client.db()

    const showsCollection = db.collection('shows')

    const newShow = {
      title: data.title,
      genres: data.genres.split(', '), // split the genres into an array
      bio: data.bio,
      videos: data.videos.split(', '), // split the video URLs into an array
      interestedUsers: [], // initialize empty array for interested users
      notInterestedUsers: [],
      comments: [],
    }

    const result = await showsCollection.insertOne(newShow)

    client.close()

    res.status(201).json({ message: 'Show inserted.' })
  }
}
