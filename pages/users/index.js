import UserList from '../../components/UserList'
import Main from '../../components/layout/Main'

const USERS = [
  {
    userID: 1,
    username: 'corpsebandit',
    password: 'saltyfish111',
    profile: 'Just a boy',
  },
  {
    userID: 2,
    username: 'sallyfields',
    password: 'bouncyboy23',
    profile: 'Just a girl',
  },
  {
    userID: 3,
    username: 'chxnlittle',
    password: 'goldeen',
    profile: 'Just a fish',
  },
]

export default function Users() {
  return (
    <>
      <Main>
        <UserList users={USERS} />
      </Main>
    </>
  )
}
