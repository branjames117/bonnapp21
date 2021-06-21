/* API call for creating a new user in the database */

import { hashPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  /* check that only proper requests work, prevents people from wrecking my server with silliness */
  if (
    req.method !== 'POST' ||
    !req.body ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).json({
      message:
        'Bad request. Try using the Register page on the website instead.',
    })
    return
  }

  const { username, password } = req.body

  /* server-side validation, same tests as client-side, performed
  again here in case user tries to sneak through the back */
  if (
    username.trim() === '' ||
    username.trim().length < 4 ||
    username.trim().length > 14
  ) {
    /* 512 custom status - invalid username */
    res.status(512).json({ message: 'Invalid username.' })
    return
  }
  if (
    password.trim() === '' ||
    password.trim().length < 8 ||
    !username.match(/^[a-zA-Z0-9\-]+$/) ||
    !password.match(/^[a-zA-Z0-9!@#$%^&*\-]+$/)
  ) {
    /* 513 custom status - invalid password */
    res.status(513).json({ message: 'Invalid password.' })
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

  /* check db to see if username already exists */
  const existingUser = await db
    .collection('users')
    .findOne({ username: username })

  if (existingUser) {
    /* 514 custom status - I'm a teapot */
    res.status(514).json({ message: 'User already exists.' })
    client.close()
    return
  }

  /* if username and password are both valid and username is available,
  hash the password and add the user to the db! */
  const hashedPassword = await hashPassword(password)

  await db.collection('users').insertOne({
    username: username,
    password: hashedPassword,
    bio: 'My profile is so blank right now.',
    firstname: '',
    birthday: '',
    bonnaroos: '',
    location: '',
    facebookURL: '',
    instaURL: '',
    twitterURL: '',
    videoURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    friends: [],
    friendOf: [],
    excited: [],
    comments: [],
    friendsEnabled: 'true',
    commentsEnabled: 'true',
    joined: new Date().toISOString().slice(0, 10),
  })

  /* 201 status - request succeeded, new resource created as result */
  res.status(201).json({ message: 'User created!' })
  client.close()
}
