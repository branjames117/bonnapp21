import { ObjectId } from 'bson'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  /* connect to the db */
  const client = await connectToDatabase()
  const db = client.db()
  const users = db.collection('users')

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    const { username, body, author } = req.body

    /* create a new comment object */
    const newComment = {
      id: ObjectId().toString(),
      body: body,
      author: author,
      timestamp: new Date().toLocaleString(),
    }

    const result = await users.updateOne(
      { username: username },
      { $push: { comments: newComment } }
    )

    client.close()

    if (!result.result.ok) {
      res.status(503).json({
        message: 'Comment not created. The database encountered an error.',
      })
    } else {
      res.status(201).json({ message: 'Comment created.' })
    }
  }

  /* if DELETE method, delete the selected comment */
  if (req.method === 'DELETE') {
    /* object destructuring */
    const { username, commentID } = req.body
    console.log(req.body)

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result = await users.updateOne(
      {
        username: username,
      },
      { $pull: { comments: { id: commentID } } }
    )

    client.close()

    if (!result.result.ok) {
      res.status(503).json({
        message: 'Comment not deleted. The database encountered an error.',
      })
    } else {
      res.status(200).json({ message: 'Comment deleted.' })
    }
  }
}
