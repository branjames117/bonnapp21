import { useRouter } from 'next/router'
import Main from '../../components/layout/Main'

// the [] in the filename tells Next.js that this is a dynamic page name

export default function Home() {
  // use the Next.js router hook to get access to the dynamic URL parameter
  const router = useRouter()
  const userID = router.query.userID

  // To do:
  // use userID to fetch user profile information from database

  return (
    <>
      <Main>
        <h1>Welcome, {userID}!</h1>
      </Main>
    </>
  )
}
