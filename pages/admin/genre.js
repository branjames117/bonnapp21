import AddGenre from '../../components/admin/AddGenre'
import { getSession } from 'next-auth/client'

/* secret page for adding new genres to the database
only visible to user 'admin' */

export default function AdminGenrePage() {
  return (
    <div style={{ flex: 1 }}>
      <AddGenre />
    </div>
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
