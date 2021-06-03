/* Secret admin page for uploading show documents to the db */

import { useRouter } from 'next/router'
import AdminShows from '../../components/admin/AdminShows'
import Main from '../../components/layout/Main'
import { getSession } from 'next-auth/client'

/* using getServerSideProps as a server-side page gate */
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  /* if user tries to visit /admin without auth, redir to login */
  if (!session || session.user.name !== 'branjames117') {
    return { redirect: { destination: '/users/login' } }
  }

  return {
    props: {},
  }
}

export default function Admin() {
  const router = useRouter()

  /* get data from the AdminShows component, send to API */
  async function addShowHandler(showData) {
    const response = await fetch('/api/admin/new-show', {
      method: 'POST',
      body: JSON.stringify(showData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    /* send us back to root after we hit submit */
    router.push('/')
  }

  return (
    <Main>
      <AdminShows onAddShow={addShowHandler} />
    </Main>
  )
}
