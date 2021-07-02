import { connectToDatabase } from '../../../lib/db'

/* API call handler for fetching excited users */

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { show } = req.body

    /* connect to the db */
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

    const fetchedShow = await showsCollection
      .find({ title: show })
      .project({ excitedUsers: 1, _id: 0 })
      .toArray()

    const excitedUsers = fetchedShow[0].excitedUsers

    /* sort the array alphabetically */
    excitedUsers.sort((a, b) => {
      let fa = a.toLowerCase(),
        fb = b.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

    client.close()

    res.status(201).json({ excitedUsers: excitedUsers })
  } else {
    res.status(400).json({ message: 'Invalid request.', excitedUsers: [] })
  }
  return
}
