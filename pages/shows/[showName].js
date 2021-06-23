import Head from 'next/head'
import ShowProfile from '../../components/shows/ShowProfile'
import Grid from '../../components/layout/Grid'
import { connectToDatabase } from '../../lib/db'

export default function ShowPage(props) {
  return (
    <Grid>
      <Head>
        <title>BonnApp21 - {props.show.title}</title>
        <meta
          name='description'
          content={`${props.show.title} is coming to Bonnaroo 2021!`}
        />
      </Head>
      <ShowProfile show={props.show} />
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
  const requestedShow = context.params.showName

  const showsCollection = db.collection('shows')

  /* use the dynamic page URL to choose which show to pull from db */
  const show = await showsCollection.findOne({
    title: requestedShow,
  })

  client.close()

  /* if show not found in db, 404 */
  if (!show) {
    return {
      notFound: true,
    }
  }

  /* convert the _id key to a string so we can use it as a prop */
  show._id += ''

  return {
    props: {
      show,
    },
  }
}
