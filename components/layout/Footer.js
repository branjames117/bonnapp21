import styles from './Footer.module.css'

export default function Footer(props) {
  return (
    <footer className={styles.footer}>
      <p>
        <a href='https://github.com/branjames117'>Visit the GitHub Repo</a>
        <br />
        &copy; 2021 Brandon James
      </p>
    </footer>
  )
}
