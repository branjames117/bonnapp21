import { getSession } from 'next-auth/client'
import { ObjectId } from 'bson'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  const session = await getSession({ req })
  const pageID = req.query.pageID

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
    return
  }

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    const { username, text } = req.body

    /* API protections - reject if no session, or if session name does not match
    comment author's name */
    if (!session || session.user.name !== username) {
      res.status(401).json({ message: 'Invalid credentials.' })
      return
    }
    if (!username || !text || text.trim() === '' || text.trim().length > 500) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }

    /* BEGIN NOTIFICATION SETTER */
    /* first check if comment belongs to a user profile */
    const usersCollection = db.collection('users')
    const notifyUser = await usersCollection.findOne({
      _id: ObjectId(pageID),
    })
    if (notifyUser) {
      /* user profile comment has been commented upon, so let's increment
      the notifs object in that user's document only, since only that user
      needs the notification, using the user's own ID */
      await usersCollection.updateOne(
        { _id: ObjectId(pageID) },
        { $inc: { notifs: 1 } }
      )
    } else {
      /* no user found, so check if it's a show profile being commented upon */
      const showsCollection = db.collection('shows')
      const notifyShow = await showsCollection.findOne({
        _id: ObjectId(pageID),
      })
      if (notifyShow) {
        /* it is, so let's loop through each of the "excitedUsers", add each of them
        as a property in the show document's notifs field, and then increment each one */
        notifyShow.excitedUsers.forEach(async (user) => {
          const notifField = { $inc: {} }
          notifField['$inc']['notifs.' + user] = 1
          await showsCollection.updateOne({ _id: ObjectId(pageID) }, notifField)
        })
      }
    }
    /* END NOTIFICATION SETTER */

    /* create a new comment object */
    const newComment = {
      pageID,
      text,
      username,
      timestamp: new Date(),
    }

    await commentsCollection.insertOne(newComment)

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
    return
  }

  /* if DELETE method, delete the selected comment */
  if (req.method === 'DELETE') {
    /* object destructuring */
    const { commentID, username } = req.body

    /* only allow auth'd users to delete their own comments */
    if (!session || session.user.name !== username) {
      res.status(401).json({ message: 'Invalid credentials.' })
      return
    }

    /* Use the $pull operator to remove the ID'd comment from the comments array */
    const result = await commentsCollection.deleteOne({
      _id: ObjectId(commentID),
    })

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
    return
  }
}
