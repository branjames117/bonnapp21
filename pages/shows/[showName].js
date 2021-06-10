import Main from '../../components/layout/Main'
import ShowProfile from '../../components/shows/ShowProfile'
import { connectToDatabase } from '../../lib/db'
import { useRouter } from 'next/router'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()

  const shows = db.collection('shows')

  const fetchedShow = await shows.findOne({
    title: context.params.showName,
  })

  const { _id, ...show } = fetchedShow
  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      show,
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 1,
  }
}

// go over each item in the database to generate static page paths for each show
export async function getStaticPaths() {
  const client = await connectToDatabase()
  const db = client.db()

  const shows = db.collection('shows')

  const allShows = await shows.find({}).toArray()

  client.close()
  let paths = allShows.map((show) => ({ params: { showName: show.title } }))

  return {
    fallback: true,
    paths: allShows.map((show) => ({ params: { showName: show.title } })),
  }
}

export default function Show(props) {
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
