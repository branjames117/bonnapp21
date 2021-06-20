import { ObjectId } from 'bson'
import { connectToDatabase } from '../../../lib/db'

/* to do: there's a ton of overlap between adding comments for show and for user profiles,
so eventually come back here and combine the two */

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

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    const { body, author, show } = req.body

    /* create a new comment object */
    const newComment = {
      id: ObjectId().toString(),
      body: body,
      author: author,
      timestamp: new Date().toLocaleString(),
    }

    const result = await shows.updateOne(
      { title: show },
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
    const { show, commentID } = req.body

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result = await shows.updateOne(
      {
        title: show,
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
