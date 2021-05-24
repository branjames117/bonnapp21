import Link from 'next/link'
import Main from '../components/layout/Main'

export default function Home() {
  return (
    <>
      <Main>
        <Link href='/shows'>See the shows!</Link>
        <Link href='/users'>See the users!</Link>
        <Link href='/admin'>See the admin page!</Link>
      </Main>
    </>
  )
}
