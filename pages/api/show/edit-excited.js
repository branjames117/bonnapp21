import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
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
  const shows = db.collection('shows')
  const users = db.collection('users')

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    const { user, show } = req.body

    const alreadyExcited = await shows.findOne({ title: show })

    if (alreadyExcited.excitedUsers.includes(user)) {
      res.status(422).json({ message: 'User already exists in list' })
      client.close()
      return
    }

    const result1 = await shows.updateOne(
      { title: show },
      { $push: { excitedUsers: user } }
    )

    const result2 = await users.updateOne(
      { username: user },
      { $push: { excited: show } }
    )

    client.close()

    if (!result1.result.ok || !result2.result.ok) {
      res.status(503).json({
        message:
          'Excited users not updated. The database encountered an error.',
      })
    } else {
      res.status(201).json({ message: 'Excited users updated.' })
    }
  }

  /* if DELETE method, delete the selected comment */
  if (req.method === 'DELETE') {
    const { user, show } = req.body

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result1 = await shows.updateOne(
      {
        title: show,
      },
      { $pull: { excitedUsers: user } }
    )

    const result2 = await users.updateOne(
      { username: user },
      { $pull: { excited: show } }
    )

    client.close()

    if (!result1.result.ok || !result2.result.ok) {
      res.status(503).json({
        message:
          'Excited users not updated. The database encountered an error.',
      })
    } else {
      res.status(200).json({ message: 'Excited users updated.' })
    }
  }
}
