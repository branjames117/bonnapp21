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
  console.log('Connecting to database')
  const client = await connectToDatabase()
  if (!client) {
    console.log('Database connection failed')
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
  console.log(requestedShow)

  const showsCollection = db.collection('shows')

  /* use the dynamic page URL to choose which show to pull from db */
  const show = await showsCollection.findOne({
    title: requestedShow,
  })
  console.log(show)

  client.close()

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
