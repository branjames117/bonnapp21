import AdminShows from '../../components/admin/AdminShows'
import AdminUsers from '../../components/admin/AdminUsers'
import Main from '../../components/layout/Main'

export default function Admin() {
  const shows = [{ title: 'Muse' }, { title: 'Flogging Molly' }]

  const addShowHandler = (showData) => {
    console.log(showData)
  }

  const users = [{ username: 'corpse' }, { username: 'sally' }]

  const addUserHandler = (userData) => {
    console.log(userData)
  }

  return (
    <>
      <Main>
        <AdminShows onAddShow={addShowHandler} />
        <AdminUsers onAddUser={addUserHandler} />
        <AdminUsers onAddUser={addUserHandler} />
      </Main>
    </>
  )
}
