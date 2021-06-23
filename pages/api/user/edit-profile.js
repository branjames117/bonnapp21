import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  /* if someone tries to access API without active session, they
  may be trying to hack my API and access other users' info, so
  give them the boot! */
  const session = await getSession({ req })
  if (!session) res.status(401).json({ message: 'No active session found.' })
  const username = session.user.name

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

  /* server-side validation */
  let validForm = true

  if (bio.trim().length > 500) {
    validForm = false
  }

  if (firstname.trim().length > 30) {
    validForm = false
  }

  if (location.trim().length > 30) {
    validForm = false
  }

  if (
    facebookURL.trim().length > 30 ||
    facebookURL.includes('.com') ||
    instaURL.trim().length > 30 ||
    instaURL.includes('.com') ||
    twitterURL.trim().length > 30 ||
    twitterURL.includes('.com')
  ) {
    validForm = false
  }

  if (
    videoURL.trim().length > 45 ||
    !videoURL.includes('www.youtube.com/watch?')
  ) {
    validForm = false
  }

  if (!validForm) {
    client.close()
    res.status(422).json({ message: 'Invalid input.' })
    return
  }

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
