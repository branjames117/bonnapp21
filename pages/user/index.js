import Head from 'next/head'
import Lineup from '../../components/shows/Lineup'

// this is the home page of the website, the / route

export default function Home() {
  return (
    <div style={{ flex: 1 }}>
      <Head>
        <title>BonnApp21 - Lineup</title>
      </Head>
      <Lineup />
    </div>
  )
}
