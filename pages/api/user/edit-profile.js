import { connectToDatabase } from '../../../lib/db'
import { hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await connectToDatabase()
    const db = client.db()
    const usersCollection = db.collection('users')

    const hashedPassword = await hashPassword(data.newPassword)

    const userData = {
      bio: data.bio,
      firstname: data.firstname,
      birthday: data.birthday,
      location: data.location,
      bonnaroos: data.bonnaroos,
      videoURL: data.videoURL,
      facebookURL: data.facebookURL,
      twitterURL: data.twitterURL,
      instaURL: data.instaURL,
      friendsEnabled: data.friendsEnabled,
      commentsEnabled: data.commentsEnabled,
      password: hashedPassword,
    }

    await usersCollection.updateOne(
      { username: data.username },
      { $set: { ...userData } }
    )

    client.close()

    res.status(201).json({ message: 'User edited.' })
  }
}
