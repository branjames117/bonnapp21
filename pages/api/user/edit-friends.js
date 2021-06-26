import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  const session = await getSession({ req })

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
  const users = db.collection('users')

  const { username, friendName } = req.body

  /* reject if invalid credentials */
  if (!session || session.user.name !== username) {
    res.status(401).json({ message: 'Invalid credentials.' })
    return
  }

  /* if POST method, add friend to friends list */
  if (req.method === 'POST') {
    const alreadyFriend = await users.findOne({ username: username })

    if (alreadyFriend.friends.includes(friendName)) {
      res.status(422).json({ message: 'Friend already exists in list' })
      client.close()
      return
    }

    const result1 = await users.updateOne(
      { username: username },
      { $push: { friends: friendName } }
    )

    const result2 = await users.updateOne(
      { username: friendName },
      { $push: { friendOf: username } }
    )

    client.close()

    if (!result1.result.ok || !result2.result.ok) {
      res.status(503).json({
        message: 'Friends list not updated. The database encountered an error.',
      })
    } else {
      res.status(201).json({ message: 'Friends list updated.' })
    }
  }

  /* if DELETE method, delete the selected comment */
  if (req.method === 'DELETE') {
    /* Use the $pull operator to remove the ID'd comment from the comments array */

    const result1 = await users.updateOne(
      { username: username },
      { $pull: { friends: friendName } }
    )

    const result2 = await users.updateOne(
      { username: friendName },
      { $pull: { friendOf: username } }
    )

    client.close()

    if (!result1.result.ok || !result2.result.ok) {
      res.status(503).json({
        message: 'Friends list not updated. The database encountered an error.',
      })
    } else {
      res.status(200).json({ message: 'Friends list updated.' })
    }
  }
}
