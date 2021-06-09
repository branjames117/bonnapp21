import classes from './Header.module.css'
import Link from 'next/link'
import { signout, useSession } from 'next-auth/client'
import randomColorGenerator from '../../lib/random-colors'

export default function Header(props) {
  const [session, _] = useSession()

  function logoutHandler() {
    signout({ callbackUrl: '/' })
  }

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <span className={classes.navLogo}>
            <Link href='/'>
              <a style={{ color: randomColorGenerator() }}>BonnApp21</a>
            </Link>
          </span>
        </div>
        <div>
          <ul className={classes.ul}>
            <li>
              <Link href='/lineup'>
                <a style={{ color: randomColorGenerator() }}>Lineup</a>
              </Link>
            </li>
            <li>
              <Link href='/genres'>
                <a style={{ color: randomColorGenerator() }}>Genres</a>
              </Link>
            </li>
            {/* render if no active session */}
            {!session && (
              <>
                <li>
                  <Link href='/users/register'>
                    <a style={{ color: randomColorGenerator() }}>Register</a>
                  </Link>
                </li>
                <li>
                  <Link href='/users/login'>
                    <a style={{ color: randomColorGenerator() }}>Login</a>
                  </Link>
                </li>
              </>
            )}
            {/* render if active session */}
            {session && (
              <>
                <li>
                  <Link href={`/users/${session.user.name}`}>
                    <a
                      style={{
                        color: randomColorGenerator(),
                      }}
                    >
                      Profile
                    </a>
                  </Link>
                </li>
                <li onClick={logoutHandler}>
                  <a
                    style={{ color: randomColorGenerator(), cursor: 'pointer' }}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
