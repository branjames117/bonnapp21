import { useRouter } from 'next/router'
import Main from '../../components/layout/Main'
import UserProfile from '../../components/users/UserProfile'
import { connectToDatabase } from '../../lib/db'

export default function UserPage(props) {
  const router = useRouter()

  /* CREATE COMMENT HANDLER */
  async function onAddCommentHandler(commentData) {
    const response = await fetch('/api/user/edit-comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.user.username)
  }

  /* DELETE COMMENT HANDLER */
  async function onDeleteCommentHandler(commentData) {
    const response = await fetch('/api/user/edit-comments', {
      method: 'DELETE',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.user.username)
  }

  async function onAddFriendHandler(friendData) {
    const response = await fetch('/api/user/edit-friends', {
      method: 'POST',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.user.username)
  }

  async function onDeleteFriendHandler(friendData) {
    const response = await fetch('/api/user/edit-friends', {
      method: 'DELETE',
      body: JSON.stringify(friendData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.user.username)
  }

  async function onDeleteExcitedUserHandler(excitedData) {
    const response = await fetch('/api/show/edit-excited', {
      method: 'DELETE',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.user.username)
  }

  return (
    <Main>
      <UserProfile
        user={props.user}
        onAddComment={onAddCommentHandler}
        onDeleteComment={onDeleteCommentHandler}
        onAddFriend={onAddFriendHandler}
        onDeleteFriend={onDeleteFriendHandler}
        onDeleteExcitedUser={onDeleteExcitedUserHandler}
      />
    </Main>
  )
}

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()
  const requestedUser = context.params.userName

  const users = db.collection('users')

  /* use the dynamic page URL to choose which username to pull from db */
  const fetchedUser = await users.findOne({
    username: requestedUser,
  })

  client.close()

  /* use rest operator to separate out the _id and password keys */
  const { _id, password, ...user } = fetchedUser

  return {
    props: {
      user,
    },
    revalidate: 1,
  }
}

/* go over each item in the database to generate static page paths for each user */
export async function getStaticPaths() {
  const client = await connectToDatabase()
  const db = client.db()

  const usersCollection = db.collection('users')

  const fetchedUsers = await usersCollection.find({}, { username: 1 }).toArray()

  const paths = fetchedUsers.map((user) => ({
    params: { userName: user.username },
  }))

  client.close()

  return {
    paths,
    fallback: false,
  }
}
