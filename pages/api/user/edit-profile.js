import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  /* if someone tries to access API without active session, they
  may be trying to hack my API and access other users' info, so
  give them the boot! */
  const session = await getSession({ req })
  if (!session) res.status(401).json({ message: 'No active session found.' })

  /* check that only proper requests work, prevents people from wrecking my server with silliness */
  if (req.method !== 'POST' || !req.body) {
    res.status(400).json({
      message:
        'Bad request. Try using the website to edit your profile instead.',
    })
    return
  }

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

  const {
    username,
    bio,
    firstname,
    birthday,
    location,
    bonnaroos,
    videoURL,
    facebookURL,
    twitterURL,
    instaURL,
    friendsEnabled,
    commentsEnabled,
    newPassword,
  } = req.body

  const userData = {
    bio,
    firstname,
    birthday,
    location,
    bonnaroos,
    videoURL,
    facebookURL,
    twitterURL,
    instaURL,
    friendsEnabled,
    commentsEnabled,
  }

  await users.updateOne({ username: username }, { $set: { ...userData } })

  /* follow up with a password update only if new password entered */
  if (newPassword) {
    const hashedPassword = await hashPassword(newPassword)
    await users.updateOne(
      { username: username },
      { $set: { password: hashedPassword } }
    )
  }

  client.close()

  res.status(201).json({ message: 'User edited.' })
}
