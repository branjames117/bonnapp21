/* /shows route - has list of all shows, with individual links to show profile pages */

import ShowList from '../../components/shows/ShowList'
import Main from '../../components/layout/Main'
import { MongoClient } from 'mongodb'

export async function getStaticProps() {
  // code written in here is executed during the build process, never seen by client
  // fetch API data or use data from files in filesystem, whatever

  const uri = process.env.DB_URL
  // create client connection
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true })
  // connect client to database
  const db = client.db()

  // connect database to collection
  const showsCollection = db.collection('shows')

  // get all shows from collection
  const SHOWS = await showsCollection.find().toArray()

  // close client connection
  client.close()

  // return as props the results of database query
  return {
    props: {
      shows: SHOWS.map((show) => ({
        title: show.title,
        genres: show.genres,
        bio: show.bio,
        videos: show.videos,
        id: show._id.toString(),
      })),
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 1,
  }
}

export default function Shows(props) {
  return (
    <Main>
      <ShowList shows={props.shows} />
    </Main>
  )
}
