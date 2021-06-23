import { getSession } from 'next-auth/client'
import { ObjectId } from 'bson'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  const session = await getSession({ req })
  const pageID = req.query.pageID

  if (!session) {
    res.status(401).json({
      message: 'No active session found.',
      comments: [],
    })
    return
  }

  if (!pageID) {
    res.status(400).json({
      message: 'Bad input.',
      comments: [],
    })
    return
  }

  /* connect to the db */
  const client = await connectToDatabase()
  /* if db connection fails, respond with empty array */
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
      comments: [],
    })
    client.close()
    return
  }
  const db = client.db()
  const commentsCollection = db.collection('comments')

  /* if GET method, get all comments */
  if (req.method === 'GET') {
    const comments = await commentsCollection
      .find({ pageID: pageID })
      .sort({ timestamp: -1 })
      .toArray()

    client.close()

    if (!comments) {
      res.status(503).json({
        comments: [],
        message: 'Unable to retrieve comments.',
      })
    } else {
      res.status(201).json({ comments: comments })
    }
  }

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    if (!session) res.status(401).json({ message: 'No active session found.' })
    const { username, text } = req.body

    if (!username || !text || text.trim() === '' || text.trim().length > 500) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }

    /* create a new comment object */
    const newComment = {
      pageID,
      text,
      username,
      timestamp: new Date(),
    }

    const result = await commentsCollection.insertOne(newComment)

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
    if (!session) res.status(401).json({ message: 'No active session found.' })
    /* object destructuring */
    const { commentID } = req.body

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result = await commentsCollection.deleteOne({
      _id: ObjectId(commentID),
    })

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
