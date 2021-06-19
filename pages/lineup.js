import Lineup from '../components/shows/Lineup'

// this is the home page of the website, the / route

export default function Home(pageProps) {
  return (
    <div style={{ flex: 1 }}>
      <Lineup />
    </div>
  )
}
