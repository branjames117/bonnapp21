import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

/* API call handler for adding/removing excited users */

export default async function handler(req, res) {
  const session = await getSession({ req })

  /* if POST method, add user to excitedUsers array */
  if (req.method === 'POST') {
    const { user, show } = req.body

    if (session.user.name !== user) {
      res
        .status(401)
        .json({ message: 'Invalid session credentials.', excitedUsers: [] })
      return
    }

    /* connect to the db */
    const client = await connectToDatabase()
    if (!client) {
      res.status(503).json({
        message: 'Unable to access database.',
        excitedUsers: [],
      })
      client.close()
      return
    }
    const db = client.db()
    const showsCollection = db.collection('shows')

    const result = await showsCollection.updateOne(
      { title: show },
      { $push: { excitedUsers: user } }
    )

    const fetchedShow = await showsCollection
      .find({ title: show })
      .sort()
      .project({ excitedUsers: 1, _id: 0 })
      .toArray()

    const excitedUsers = fetchedShow[0].excitedUsers

    client.close()

    if (!result.result.ok) {
      res.status(503).json({
        message: 'The database encountered an error.',
        excitedUsers: [],
      })
    } else {
      res.status(201).json({ excitedUsers: excitedUsers })
    }
  }

  /* if DELETE method, delete the selected user from the excitedUsers array */
  if (req.method === 'DELETE') {
    const { user, show } = req.body

    if (session.user.name !== user) {
      res
        .status(401)
        .json({ message: 'Invalid session credentials.', excitedUsers: [] })
      return
    }

    /* connect to the db */
    const client = await connectToDatabase()
    if (!client) {
      res.status(503).json({
        message: 'Unable to access database.',
        excitedUsers: [],
      })
      client.close()
      return
    }
    const db = client.db()
    const showsCollection = db.collection('shows')

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result = await showsCollection.updateOne(
      {
        title: show,
      },
      { $pull: { excitedUsers: user } }
    )

    const fetchedShow = await showsCollection
      .find({ title: show })
      .sort()
      .project({ excitedUsers: 1, _id: 0 })
      .toArray()

    const excitedUsers = fetchedShow[0].excitedUsers

    client.close()

    if (!result.result.ok) {
      res.status(503).json({
        message: 'The database encountered an error.',
        excitedUsers: [],
      })
    } else {
      res.status(201).json({ excitedUsers: excitedUsers })
    }
  }
}
