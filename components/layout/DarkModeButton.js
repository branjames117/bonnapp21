import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import classes from './DarkModeButton.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function DarkModeButton(props) {
  const { darkTheme } = useContext(ThemeContext)
  const [buttonColor, setButtonColor] = useState({})
  useEffect(() => {
    darkTheme
      ? setButtonColor({ backgroundColor: '#ddd' })
      : setButtonColor({ backgroundColor: randomColorGenerator() })
  }, [darkTheme])

  return (
    <button style={buttonColor} onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
