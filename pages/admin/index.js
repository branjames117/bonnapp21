import { useRouter } from 'next/router'
import AdminShows from '../../components/admin/AdminShows'
import Main from '../../components/layout/Main'

export default function Admin() {
  const router = useRouter()

  async function addShowHandler(showData) {
    const response = await fetch('/api/new-show', {
      method: 'POST',
      body: JSON.stringify(showData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    router.push('/')
  }

  return (
    <Main>
      <AdminShows onAddShow={addShowHandler} />
    </Main>
  )
}
