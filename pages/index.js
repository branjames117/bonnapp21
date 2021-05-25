import Link from 'next/link'
import Main from '../components/layout/Main'

// this is the home page of the website, the / route

export default function Home() {
  return (
    <Main>
      <Link href='/shows'>See the shows!</Link>
      <Link href='/users'>See the users!</Link>
      <Link href='/admin'>See the admin page!</Link>
      <Link href='/users/register'>Register!</Link>
    </Main>
  )
}
