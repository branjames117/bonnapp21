import Main from '../../components/layout/Main'
import UserProfile from '../../components/users/UserProfile'

// the [] in the filename tells Next.js that this is a dynamic page name

export async function getStaticProps(context) {
  const username = context.params.username
  // code written in here is executed during the build process, never seen by client
  // fetch API data or use data from files in filesystem, whatever
  return {
    props: {
      users: {
        userID: 1,
        username: username,
        password: 'sticklebuns',
        profile: 'bio',
      },
    },
    // setting this tells the server to regenerate the page every 10 seconds
    // important for when data is changing frequently
    revalidate: 10,
  }
}

// needs exported in any page component file that's a dynamic page which also uses static props
export function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/users/username',
      // Object variant:
      { params: { username: 'failbandit' } },
      { params: { username: 'sallyfields' } },
      { params: { username: 'chxnlittle' } },
    ],
    fallback: false,
  }
}

export default function User(props) {
  // To do:
  // use userID to fetch user profile information from database

  return (
    <Main>
      <UserProfile
        userID={props.users.userID}
        username={props.users.username}
        password={props.users.password}
        profile={props.users.profile}
      />
    </Main>
  )
}
