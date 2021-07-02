import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (
    (req.method !== 'POST' &&
      req.method !== 'PATCH' &&
      req.method !== 'DELETE') ||
    !req.body
  ) {
    res.status(400).json({
      message: 'Invalid request type.',
      friendsList: [],
      friendOfList: [],
    })
    return
  }

  /* connect to db */
  const client = await connectToDatabase()

  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
      friendsList: [],
      friendOfList: [],
    })
    client.close()
    return
  }

  const db = client.db()
  const usersCollection = db.collection('users')

  /* if POST method, return friend's list for the user profile;
  session independent - user's friend's list is visible to all */
  if (req.method === 'POST') {
    const { username } = req.body

    const fetchedFriend = await usersCollection.findOne({ username: username })

    const friendsList = fetchedFriend.friends
    const friendOfList = fetchedFriend.friendOf

    /* sort each array alphabetically */
    friendsList.sort((a, b) => {
      let fa = a.toLowerCase(),
        fb = b.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

    friendOfList.sort((a, b) => {
      let fa = a.toLowerCase(),
        fb = b.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

    client.close()

    if (!fetchedFriend) {
      res.status(503).json({
        message: 'Unable to find user in database.',
        friendsList: [],
        friendOfList: [],
      })
    } else {
      res
        .status(201)
        .json({ friendsList: friendsList, friendOfList: friendOfList })
    }
    return
  }

  /* if PATCH method, we are following a new friend */
  if (req.method === 'PATCH') {
    const { username, friend } = req.body

    /* reject if invalid credentials */
    if (!session || session.user.name !== username) {
      res.status(401).json({
        message: 'Invalid credentials.',
        friendsList: [],
        friendOfList: [],
      })
      client.close()
      return
    }

    /* push friend to user's friends array */
    await usersCollection.updateOne(
      {
        username: username,
      },
      { $push: { friends: friend } }
    )

    /* push user to friend's friendOf array */
    await usersCollection.updateOne(
      { username: friend },
      { $push: { friendOf: username } }
    )

    const fetchedFriend = await usersCollection.findOne({
      username: friend,
    })

    const friendOfList = fetchedFriend.friendOf

    client.close()

    if (!fetchedFriend) {
      res.status(503).json({
        message: 'The database encountered an error.',
        friendOfList: [],
      })
    } else {
      res.status(201).json({ friendOfList: friendOfList })
    }
  }

  /* if DELETE method, we are unfollowing a friend */
  if (req.method === 'DELETE') {
    const { username, friend } = req.body

    /* reject if invalid credentials */
    if (!session || session.user.name !== username) {
      res.status(401).json({
        message: 'Invalid credentials.',
        friendsList: [],
        friendOfList: [],
      })
      client.close()
      return
    }

    /* push friend to user's friends array */
    await usersCollection.updateOne(
      {
        username: username,
      },
      { $pull: { friends: friend } }
    )

    await usersCollection.updateOne(
      { username: friend },
      { $pull: { friendOf: username } }
    )

    const fetchedFriend = await usersCollection.findOne({
      username: friend,
    })

    const friendsList = fetchedFriend.friends
    const friendOfList = fetchedFriend.friendOf

    client.close()

    if (!fetchedFriend) {
      res.status(503).json({
        message: 'The database encountered an error.',
        friendsList: [],
        friendOfList: [],
      })
    } else {
      res
        .status(201)
        .json({ friendsList: friendsList, friendOfList: friendOfList })
    }
  }
}
