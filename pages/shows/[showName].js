import { useRouter } from 'next/router'
import Main from '../../components/layout/Main'
import ShowProfile from '../../components/shows/ShowProfile'
import { connectToDatabase } from '../../lib/db'

export default function ShowPage(props) {
  const router = useRouter()

  async function onAddCommentHandler(commentData) {
    const response = await fetch('/api/show/edit-comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.show.title)
  }

  /* DELETE COMMENT HANDLER */
  async function onDeleteCommentHandler(commentData) {
    const response = await fetch('/api/show/edit-comments', {
      method: 'DELETE',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.show.title)
  }

  async function onAddExcitedUserHandler(excitedData) {
    const response = await fetch('/api/show/edit-excited', {
      method: 'POST',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.show.title)
  }

  async function onDeleteExcitedUserHandler(excitedData) {
    const response = await fetch('/api/show/edit-excited', {
      method: 'DELETE',
      body: JSON.stringify(excitedData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()
    console.log(data)
    router.push(props.show.title)
  }

  return (
    <Main>
      <ShowProfile
        show={props.show}
        onAddExcitedUser={onAddExcitedUserHandler}
        onDeleteExcitedUser={onDeleteExcitedUserHandler}
        onAddComment={onAddCommentHandler}
        onDeleteComment={onDeleteCommentHandler}
      />
    </Main>
  )
}

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()
  const requestedShow = context.params.showName

  const showsCollection = db.collection('shows')

  const fetchedShow = await showsCollection.findOne({
    title: requestedShow,
  })

  client.close()

  /* use rest operator to filter out the _id */
  const { _id, ...show } = fetchedShow

  return {
    props: {
      show,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const client = await connectToDatabase()
  const db = client.db()

  const showsCollection = db.collection('shows')

  const fetchedShows = await showsCollection.find({}, { title: 1 }).toArray()

  client.close()

  const paths = fetchedShows.map((show) => ({
    params: { showName: show.title },
  }))

  return {
    paths,
    fallback: false,
  }
}
