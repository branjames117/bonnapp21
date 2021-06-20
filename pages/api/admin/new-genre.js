import { connectToDatabase } from '../../../lib/db'

/* API call handler for adding new genres to db */

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, def, wiki } = req.body

    const client = await connectToDatabase()
    if (!client) {
      res.status(503).json({
        message: 'Unable to access database.',
      })
      client.close()
      return
    }
    const db = client.db()
    const genresCollection = db.collection('genres')

    const newGenre = {
      name: name.toLowerCase(),
      def,
      wiki,
    }

    await genresCollection.insertOne(newGenre)

    client.close()

    res.status(201).json({ message: 'Genre inserted.' })
  }
}
