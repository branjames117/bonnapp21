import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import classes from './Footer.module.css'
import DarkModeButton from './DarkModeButton'

export default function Footer() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

  return (
    <footer className={classes.footer}>
      <p>
        <DarkModeButton
          onClick={() => {
            setDarkTheme(!darkTheme)
          }}
        >
          {darkTheme ? 'go neon' : 'go ghost'}
        </DarkModeButton>
      </p>
      <p>
        <a href='https://github.com/branjames117'>Visit My GitHub Repo</a>
      </p>
      <p>&copy; 2021 Brandon James</p>
    </footer>
  )
}
