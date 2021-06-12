import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    /* object destructuring */
    const { name, def, wiki } = req.body

    const client = await connectToDatabase()
    const db = client.db()
    const genres = db.collection('genres')

    const newGenre = {
      name,
      def,
      wiki,
    }

    await genres.insertOne(newGenre)

    client.close()

    res.status(201).json({ message: 'Genre inserted.' })
  }
}
