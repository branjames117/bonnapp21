import Main from '../components/layout/Main'
import Lineup from '../components/shows/Lineup'

// this is the home page of the website, the / route

export default function Home(pageProps) {
  return (
    <Main>
      <Lineup />
    </Main>
  )
}
