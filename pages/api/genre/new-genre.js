import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

/* API call handler for adding new genres to db */

export default async function handler(req, res) {
  /* if someone tries to access API without active session, they
  may be trying to hack my API, so boot em! */
  const session = await getSession({ req })
  if (!session) res.status(401).json({ message: 'No active session found.' })
  if (session.user.name !== 'admin')
    res.status(401).json({ message: 'Access restricted to admin users.' })

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
  return
}
