import AddGenre from '../../components/admin/AddGenre'
import Grid1 from '../../components/layout/Grid1'
import { getSession } from 'next-auth/client'

/* secret page for adding new genres to the database
only visible to user 'admin' */

export default function AdminGenrePage() {
  return (
    <Grid1>
      <AddGenre />
    </Grid1>
  )
}

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session || session.user.name !== 'admin') {
    return { redirect: { destination: '/' } }
  }

  return {
    props: {},
  }
}
