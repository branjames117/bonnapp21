import Grid from '../../components/layout/Grid'
import GenreList from '../../components/genres/GenreList'
import { connectToDatabase } from '../../lib/db'

export default function Show(props) {
  return (
    <Grid>
      <GenreList genres={props.uniqueGenres} />
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

  /* pull the genre data from each show, then flatten to array, then
  add to new array if not already present */
  const genres = []
  const uniqueGenres = []

  fetchedShows.forEach((show) => genres.push(show.genres))

  genres
    .flat()
    .forEach((genre) =>
      uniqueGenres.includes(genre) ? null : uniqueGenres.push(genre)
    )

  uniqueGenres.sort()

  return {
    props: {
      uniqueGenres,
    },
  }
}
