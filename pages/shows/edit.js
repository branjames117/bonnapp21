import { getSession } from 'next-auth/client'
import { connectToDatabase } from '../../lib/db'
import EditShow from '../../components/admin/EditShow'

export default function EditShowPage(props) {
  return (
    <div style={{ flex: 1 }}>
      <EditShow show={props.show} />
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

  const requestedShow = context.query.showName
  const client = await connectToDatabase()
  if (!client) {
    res.status(503).json({
      message: 'Unable to access database.',
    })
    client.close()
    return
  }
  const db = client.db()
  const showsCollection = db.collection('shows')

  const fetchedShow = await showsCollection.findOne({
    title: requestedShow,
  })

  /* use rest operator to separate out the _id key  */
  const { _id, ...show } = fetchedShow

  client.close()

  return {
    props: {
      show,
    },
  }
}
