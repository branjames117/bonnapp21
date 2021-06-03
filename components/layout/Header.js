import classes from './Header.module.css'
import Link from 'next/link'
import { signout, useSession } from 'next-auth/client'

export default function Header(props) {
  const [session, _] = useSession()

  function logoutHandler() {
    signout({ callbackUrl: '/' })
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <Link href='/'>BonnApp21</Link>
        </div>
        <div>
          <ul className={classes.ul}>
            <li>
              <Link href='/'>Shows</Link>
            </li>
            {/* render if no active session */}
            {!session && (
              <>
                <li>
                  <Link href='/users/register'>Register</Link>
                </li>
                <li>
                  <Link href='/users/login'>Login</Link>
                </li>
              </>
            )}
            {/* render if active session */}
            {session && (
              <>
                <li>
                  <Link href={`/users/${session.user.name}`}>My Profile</Link>
                </li>
                {session.user.name === 'admin' && (
                  <li>
                    <Link href='/admin'>Admin</Link>
                  </li>
                )}
                <li className={classes.link} onClick={logoutHandler}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
