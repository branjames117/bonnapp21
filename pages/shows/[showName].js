import Main from '../../components/layout/Main'
import ShowProfile from '../../components/shows/ShowProfile'
import { connectToDatabase } from '../../lib/db'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()

  const showsCollection = db.collection('shows')
  const show = await showsCollection.findOne({ title: context.params.showName })

  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      show: {
        title: show.title,
        genres: show.genres,
        bio: show.bio,
        wiki: show.wiki,
        videos: show.videos,
        excitedUsers: show.excitedUsers,
        comments: show.comments,
      },
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

  const showsCollection = db.collection('shows')

  const shows = await showsCollection.find({}, { title: 1 }).toArray()

  client.close()

  return {
    fallback: false,
    paths: shows.map((show) => ({ params: { showName: show.title } })),
  }
}

export default function Show(props) {
  return (
    <Main>
      <ShowProfile
        title={props.show.title}
        genres={props.show.genres}
        bio={props.show.bio}
        wiki={props.show.wiki}
        videos={props.show.videos}
        excitedUsers={props.show.excitedUsers}
        comments={props.show.comments}
      />
    </Main>
  )
}
