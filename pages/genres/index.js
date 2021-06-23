import Head from 'next/head'
import Grid from '../../components/layout/Grid'
import GenreList from '../../components/genres/GenreList'
import { connectToDatabase } from '../../lib/db'

export default function AllGenresPage(props) {
  return (
    <Grid>
      <Head>
        <title>BonnApp21 - all genres</title>
      </Head>
      <GenreList genres={props.genres} />
    </Grid>
  )
}

export async function getServerSideProps() {
  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return
  }
  const db = client.db()

  const shows = db.collection('shows')

  /* snatch all the shows from the db */
  const fetchedShows = await shows.find({}, { genres: 1 }).toArray()

  client.close()

  /* use frequency counter pattern to create an object containing
  1) a property for each unique genre in the database,
  2) a value for how many occurrences of the genre in the database */
  const genresFrequencyCounter = {}

  fetchedShows.forEach((show) => {
    for (let genre of show.genres) {
      genresFrequencyCounter[genre] = (genresFrequencyCounter[genre] || 0) + 1
    }
  })

  /* convert the object back into an 2-dimensional array */
  const genres = Object.entries(genresFrequencyCounter)
  /* sort alphabetically */
  genres.sort()

  return {
    props: {
      genres,
    },
  }
}
