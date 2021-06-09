import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await connectToDatabase()
    const db = client.db()
    const genres = db.collection('genres')

    const newGenre = {
      name: data.name,
      def: data.def,
      wiki: data.wiki,
    }

    await genres.insertOne(newGenre)

    client.close()

    res.status(201).json({ message: 'Genre inserted.' })
  }
}
