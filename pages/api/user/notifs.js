import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  const session = await getSession({ req })

  /* reject if invalid credentials */
  if (!session) {
    res.status(401).json({ message: 'Invalid session.' })
    return
  }

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
  const shows = db.collection('shows')

  /* the user.notifs field is incremented every time someone comments on that
  user's profile, so let's get that # for the New Comments headline */
  const user = await users.findOne({ username: session.user.name })
  const commentsOnProfile = user.notifs

  /* create a custom query field for mongo, then query with it, and
  use a projection to get only the notifs and title */
  const notifField = {}
  notifField['notifs.' + session.user.name] = { $gt: 0 }

  if (req.method === 'GET') {
    const showNotifs = await shows
      .find(notifField) /* get all shows with notifications for user */
      .project({
        title: 1,
        notifs: 1,
        _id: 0,
      }) /* return only the show name and notifs obj */
      .toArray() /* convert to array */

    client.close()

    /* create an empty notifs object, this is what we're sending to the Notifications component */
    const notifs = {}

    /* if there are new comments on profile, add the username to its own notifs obj */
    if (commentsOnProfile > 0) {
      notifs[session.user.name] = commentsOnProfile
    }

    /* now go through each show that has notifications for the user and
  add them to the notifs object */
    showNotifs.forEach((show) => {
      notifs[show.title] = show.notifs[session.user.name]
    })

    res.status(200).json({ notifs: notifs })
  }

  if (req.method === 'DELETE') {
    /* user has requested to clear all notifications */

    /* need to nest a couple objects here for the mongodb update query, ultimately
    it needs to look like this
    
      db.shows.updateMany({ 'notifs.username': { $gt: 0 } }, { $set: { 'notifs.username' : 0 }})
    */
    const setField = {}
    const blankItField = {}
    blankItField['notifs.' + session.user.name] = 0
    setField['$set'] = blankItField
    await shows.updateMany(notifField, setField)

    await users.updateOne(
      { username: session.user.name },
      { $set: { notifs: 0 } }
    )

    client.close()

    res.status(200).json({ notifs: {} })
  }

  if (req.method === 'PATCH') {
    /* user has visited a show page, so clear notifications for that specific show */

    const showName = req.body
    const setField = {}
    const blankItField = {}
    blankItField['notifs.' + session.user.name] = 0
    setField['$set'] = blankItField

    await shows.updateOne({ title: showName }, setField)

    client.close()

    res.status(200).json({})
  }
}
