import { useState } from 'react'
import classes from './Header.module.css'
import Link from 'next/link'
import { signout, useSession } from 'next-auth/client'
import randomColorGenerator from '../../lib/random-colors'

export default function Header(props) {
  const [openMenu, setOpenMenu] = useState(false)
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
              <span
                className={classes.navLink}
                style={{ color: randomColorGenerator() }}
                onClick={() => setOpenMenu(false)}
              >
                BonnApp21
              </span>
            </Link>
          </span>
        </div>
        <div>
          <div className={classes.fullMenu}>
            <ul className={classes.ul}>
              <li>
                <Link href='/lineup'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Lineup
                  </span>
                </Link>
              </li>
              <li>
                <Link href='/genres'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Genres
                  </span>
                </Link>
              </li>
              <li>
                <Link href='/random'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Random
                  </span>
                </Link>
              </li>
              {/* render if no active session */}
              {!session && (
                <>
                  <li>
                    <Link href='/users/register'>
                      <span
                        className={classes.navLink}
                        style={{ color: randomColorGenerator() }}
                      >
                        Register
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/users/login'>
                      <span
                        className={classes.navLink}
                        style={{ color: randomColorGenerator() }}
                      >
                        Login
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* render if active session */}
              {session && (
                <>
                  <li>
                    <Link href={`/users/${session.user.name}`}>
                      <span
                        className={classes.navLink}
                        style={{
                          color: randomColorGenerator(),
                        }}
                      >
                        My Profile
                      </span>
                    </Link>
                  </li>
                  <li onClick={logoutHandler}>
                    <span
                      className={classes.navLink}
                      style={{
                        color: randomColorGenerator(),
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className={classes.miniMenu}>
            <div
              className={classes.hamburger}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div
                style={{
                  backgroundColor: randomColorGenerator(),
                }}
                className={`${classes.line} ${classes.line1} ${
                  openMenu ? classes.active : null
                }`}
              ></div>
              <div
                style={{
                  backgroundColor: randomColorGenerator(),
                }}
                className={`${classes.line} ${classes.line2} ${
                  openMenu ? classes.active : null
                }`}
              ></div>
              <div
                style={{
                  backgroundColor: randomColorGenerator(),
                }}
                className={`${classes.line} ${classes.line3} ${
                  openMenu ? classes.active : null
                }`}
              ></div>
            </div>
          </div>
          <div
            className={`${classes.slideMenu} ${
              openMenu ? classes.active : null
            }`}
            onClick={() => setOpenMenu(false)}
          >
            <ul className={classes.ul}>
              <li>
                <Link href='/lineup'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Lineup
                  </span>
                </Link>
              </li>
              <li>
                <Link href='/genres'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Genres
                  </span>
                </Link>
              </li>
              <li>
                <Link href='/random'>
                  <span
                    className={classes.navLink}
                    style={{ color: randomColorGenerator() }}
                  >
                    Random
                  </span>
                </Link>
              </li>
              {/* render if no active session */}
              {!session && (
                <>
                  <li>
                    <Link href='/users/register'>
                      <span
                        className={classes.navLink}
                        style={{ color: randomColorGenerator() }}
                      >
                        Register
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/users/login'>
                      <span
                        className={classes.navLink}
                        style={{ color: randomColorGenerator() }}
                      >
                        Login
                      </span>
                    </Link>
                  </li>
                </>
              )}
              {/* render if active session */}
              {session && (
                <>
                  <li>
                    <Link href={`/users/${session.user.name}`}>
                      <span
                        className={classes.navLink}
                        style={{
                          color: randomColorGenerator(),
                        }}
                      >
                        My Profile
                      </span>
                    </Link>
                  </li>
                  <li onClick={logoutHandler}>
                    <a
                      style={{
                        color: randomColorGenerator(),
                        cursor: 'pointer',
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
