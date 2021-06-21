import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../lib/db'
import EditGenre from '../../components/admin/EditGenre'

export default function EditGenrePage(props) {
  return (
    <div style={{ flex: 1 }}>
      <EditGenre genre={props.genre} />
    </div>
  )
}

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* redirect if user has no active session and therefore
  no profile page to edit */
  if (!session || session.user.name !== 'admin') {
    return { redirect: { destination: '/' } }
  }

  const requestedGenre = context.query.genreName

  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return
  }
  const db = client.db()
  const genresCollection = db.collection('genres')

  const fetchedGenre = await genresCollection.findOne({
    name: requestedGenre,
  })

  /* use rest operator to separate out the _id key  */
  const { _id, ...genre } = fetchedGenre

  client.close()

  return {
    props: {
      genre,
    },
  }
}
