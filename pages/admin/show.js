import AddShow from '../../components/admin/AddShow'
import { getSession } from 'next-auth/client'

/* secret page for adding new shows to the database
only visible to user 'admin' */

export default function AdminShowPage() {
  return (
    <div style={{ flex: 1 }}>
      <AddShow />
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
