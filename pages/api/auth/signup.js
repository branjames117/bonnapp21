/* API call for creating a new user in the database */

import { hashPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  /* check that only POST requests work */
  if (req.method !== 'POST') {
    return
  }

  const { username, password } = req.body
  const client = await connectToDatabase()
  const db = client.db()

  /* client-side validation should prevent selection of a username already
  in the database, but check server-side just in case someone created that
  username AFTER the "already in use" array got sent to the register page.
  client should never see this error */

  const existingUser = await db
    .collection('users')
    .findOne({ username: username })

  if (existingUser) {
    res.status(422).json({ message: 'User already exists' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  await db.collection('users').insertOne({
    username: username,
    password: hashedPassword,
    bio: 'My profile is so blank right now.',
    birthday: '',
    bonnaroos: '',
    location: '',
    facebookURL: '',
    instaURL: '',
    twitterURL: '',
    genres: [],
    videoURL: '',
    friends: [],
    excited: [],
    comments: [],
    joined: new Date().toDateString().slice(4),
  })

  res.status(201).json({ message: 'User created!' })
  client.close()
}
