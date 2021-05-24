import styles from './Header.module.css'
import Link from 'next/link'

export default function Header(props) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href='/'>FestyFriend</Link>
        <Link href='/'>Login</Link>
      </nav>
    </header>
  )
}
