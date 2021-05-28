import UserList from '../../components/users/UserList'
import Main from '../../components/layout/Main'

const USERS = [
  {
    userID: 1,
    username: 'failbandit',
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

// export async function getServerSideProps(context) {
//   // const req = context.req
//   // const res = context.res
//   // fetch data from API - what getSSProps does is regenerates the page with every request
//   // ideal for pages that are constantly being updated
//   return {
//     props: {
//       users: USERS,
//     },
//   }
// }

export async function getStaticProps() {
  // code written in here is executed during the build process, never seen by client
  // fetch API data or use data from files in filesystem, whatever
  return {
    props: {
      users: USERS,
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 10,
  }
}

export default function Users(props) {
  return (
    <Main>
      <p>This page to be deleted.</p>
      <br />
      <UserList users={props.users} />
    </Main>
  )
}
