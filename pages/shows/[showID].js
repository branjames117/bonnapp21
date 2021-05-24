import { useRouter } from 'next/router'
import Main from '../../components/layout/Main'

export default function Home() {
  // use the Next.js router hook to get access to the dynamic URL parameter
  const router = useRouter()
  const showID = router.query.showID

  // To do:
  // use showID to fetch show information from database

  return (
    <>
      <Main>
        <h1>Welcome to the {showID} show!</h1>
      </Main>
    </>
  )
}
