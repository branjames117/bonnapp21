import classes from './Header.module.css'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Header(props) {
  const [session, loadingSession] = useSession()
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <Link href='/'>FestyFriend</Link>
        </div>
        <div>
          <ul className={classes.ul}>
            <li>
              <Link href='/users'>Users</Link>
            </li>
            <li>
              <Link href='/admin'>Admin</Link>
            </li>
            <li>
              <Link href='/users/register'>Register</Link>
            </li>
            {!session && (
              <li>
                <span onClick={() => signIn()}>Login</span>
              </li>
            )}
            {session && (
              <>
                <li>
                  <span onClick={() => signOut()}>Logout</span>
                </li>
                <li>{JSON.stringify(session.user.email)}</li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
