import Main from '../../components/layout/Main'
import { connectToDatabase } from '../../lib/db'
import Link from 'next/link'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()

  const shows = db.collection('shows')

  /* snatch all the shows from the db */
  const fetchedShows = await shows.find({}, { genres: 1 }).toArray()

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

  client.close()
  // send the requested show (based on param of custom URL) back as a prop
  return {
    props: {
      uniqueGenres,
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 1,
  }
}

export default function Show(props) {
  return (
    <Main>
      {props.uniqueGenres.map((genre) => (
        <Link href={`/genres/${genre}`} id={genre}>
          {genre}
        </Link>
      ))}
    </Main>
  )
}
