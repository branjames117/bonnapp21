import { hashPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  const data = req.body

  const { username, password } = data

  const client = await connectToDatabase()

  const db = client.db()

  const existingUser = await db
    .collection('users')
    .findOne({ username: username })
  if (existingUser) {
    res.status(422).json({ message: 'User already exists' })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    username: username,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'User created!' })
  client.close()
}
