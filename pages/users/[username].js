import Main from '../../components/layout/Main'
import UserProfile from '../../components/users/UserProfile'
import { connectToDatabase } from '../../lib/db'
import { useRouter } from 'next/router'

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()
  const requestedUser = context.params.userName

  const users = db.collection('users')

  /* use the dynamic page URL to choose which username to pull from db */
  const fetchedUser = await users.findOne({
    username: requestedUser,
  })

  /* use rest operator to separate out the _id and password keys we don't
  need to pass as props: user is all we care about now */
  const { _id, password, ...user } = fetchedUser
  client.close()
  /* send the requested user as a prop */
  return {
    props: {
      user,
    },
    /* setting this tells the server to regenerate the page every second;
    important for when data is changing frequently like with commenting */
    revalidate: 1,
  }
}

/* go over each item in the database to generate static page paths for each user */
export async function getStaticPaths() {
  const client = await connectToDatabase()
  const db = client.db()

  const users = db.collection('users')

  /* grab a list of every user in the db and convert it to an array */
  const userList = await users.find({}, { username: 1 }).toArray()

  client.close()

  return {
    fallback: false,
    /* for each user, create a new static param */
    paths: userList.map((user) => ({ params: { userName: user.username } })),
  }
}

export default function User(props) {
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
