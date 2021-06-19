import { connectToDatabase } from '../../lib/db'
import Link from 'next/link'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const client = await connectToDatabase()
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
    revalidate: 1,
  }
}

export default function Show(props) {
  return (
    <>
      {props.uniqueGenres.map((genre) => (
        <Link href={`/genres/${genre}`} key={genre}>
          {genre}
        </Link>
      ))}
    </>
  )
}
