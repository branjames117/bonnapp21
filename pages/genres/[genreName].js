import Main from '../../components/layout/Main'
import { connectToDatabase } from '../../lib/db'
import GenreProfile from '../../components/genres/GenreProfile'
import Link from 'next/link'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const client = await connectToDatabase()
  const db = client.db()

  const shows = db.collection('shows')
  const genres = db.collection('genres')

  const fetchedShows = await shows
    .find({
      genres: context.params.genreName,
    })
    .toArray()

  const returnedShows = []
  fetchedShows.forEach((show) =>
    returnedShows.push({
      title: show.title,
      genres: show.genres,
      bio: show.bio,
    })
  )

  /* sort the shows alphabetically before passing that array of objects as a prop */
  returnedShows.sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase()
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  const fetchedGenre = await genres.findOne({ name: context.params.genreName })

  const { _id, ...returnedGenre } = fetchedGenre

  return {
    props: { returnedShows, returnedGenre },
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

  client.close()

  return {
    fallback: false,
    paths: uniqueGenres.map((genre) => ({ params: { genreName: genre } })),
  }
}

export default function Show(props) {
  return (
    <Main>
      <GenreProfile
        shows={props.returnedShows}
        genre={props.returnedGenre}
      ></GenreProfile>
    </Main>
  )
}
