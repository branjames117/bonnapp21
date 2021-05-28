import Link from 'next/link'
import Main from '../components/layout/Main'
import Lineup from '../components/shows/Lineup'

// this is the home page of the website, the / route

export default function Home() {
  return (
    <Main>
      <Lineup />
    </Main>
  )
}
