import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../../lib/db'

function sortShows(showArray) {
  /* start with a blank 2D array, each inner array represents a day of Roo */
  const showSchedule = [[], [], [], [], []]

  /* first sort the array of shows by start time */
  showArray.sort((a, b) => {
    let fa = a.startTime,
      fb = b.startTime
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  /* then pop each show into its appropriate innerarray of the 2D array */
  showArray.forEach((show) => {
    if (show.day === 'Thursday') {
      showSchedule[0].push(show)
    } else if (show.day === 'Friday') {
      showSchedule[1].push(show)
    } else if (show.day === 'Saturday') {
      showSchedule[2].push(show)
    } else if (show.day === 'Sunday') {
      showSchedule[3].push(show)
    } else {
      showSchedule[4].push(show)
    }
  })

  return showSchedule
}

/* API call handler for fetching/deleting shows user is going to */

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.status(400).json({
      message: 'Invalid request type.',
      showSchedule: [[]],
    })
    return
  }

  /* connect to the db */
  const client = await connectToDatabase()
  /* failure to connect db? return the empty array */
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
      showSchedule: showSchedule,
    })
    client.close()
    return
  }

  const db = client.db()
  const showsCollection = db.collection('shows')

  if (req.method === 'POST') {
    const { username } = req.body

    /* get all the shows in which the user exists in the excitedUsers field */
    const fetchedShows = await showsCollection
      .find({ excitedUsers: username })
      .project({ title: 1, day: 1, startTime: 1, endTime: 1, stage: 1, _id: 0 })
      .toArray()

    client.close()

    const showSchedule = sortShows(fetchedShows)

    res.status(201).json({ showSchedule: showSchedule })
    return
  }

  /* user should only be able to delete if they have valid session */
  if (session.user.name === req.body.username && req.method === 'DELETE') {
    const { showname, username } = req.body

    /* find the show and pull the user from the excitedUsers field */
    await showsCollection.updateOne(
      { title: showname },
      { $pull: { excitedUsers: username } }
    )

    /* now query for an updated list of the user's selected shows for sending back */
    const fetchedShows = await showsCollection
      .find({ excitedUsers: username })
      .project({ title: 1, day: 1, startTime: 1, endTime: 1, _id: 0 })
      .toArray()

    client.close()

    const showSchedule = sortShows(fetchedShows)

    res.status(201).json({ showSchedule: showSchedule })
    return
  }
}
