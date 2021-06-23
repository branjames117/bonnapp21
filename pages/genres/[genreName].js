import Head from 'next/head'
import GenreProfile from '../../components/genres/GenreProfile'
import Grid from '../../components/layout/Grid'
import { connectToDatabase } from '../../lib/db'

export default function Genre(props) {
  return (
    <Grid>
      <Head>
        <title>BonnApp21 - {props.returnedGenre.name}</title>
        <meta
          name='description'
          content={`Check out all the ${props.returnedGenre.name} performers coming to Bonnaroo 2021!`}
        />
      </Head>
      <GenreProfile shows={props.returnedShows} genre={props.returnedGenre} />
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return {
      notFound: true,
    }
  }
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

  client.close()

  /* if genre not found in db, 404 */
  if (!fetchedGenre) {
    return {
      notFound: true,
    }
  }

  const { _id, ...returnedGenre } = fetchedGenre

  return {
    props: { returnedShows, returnedGenre },
  }
}
