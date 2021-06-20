import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  /* if someone tries to access API without active session, they
  may be trying to hack my API, so boot em! */
  const session = await getSession({ req })
  if (!session) res.status(401).json({ message: 'No active session found.' })

  /* check that only proper requests work, prevents people from wrecking my server with silliness */
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({
      message:
        'Bad request. Try using the website to edit the genre profile instead.',
    })
    return
  }

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

  const genreData = {
    def,
    wiki,
  }

  await genresCollection.updateOne({ name: name }, { $set: { ...genreData } })

  client.close()

  res.status(201).json({ message: 'Genre edited.' })
}
