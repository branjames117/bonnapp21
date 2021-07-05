import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import classes from './Headline.module.css'
import randomColorGenerator from '../../lib/random-colors'

/* sticking some H1's into their own component with a useEffect so their color doesn't change with every state update */

export default function Headline(props) {
  const { darkTheme } = useContext(ThemeContext)
  const [headlineColor, setHeadlineColor] = useState({})
  useEffect(() => {
    darkTheme
      ? setHeadlineColor({ color: '#ddd' })
      : setHeadlineColor({ color: randomColorGenerator() })
  }, [darkTheme])

  return (
    <h1 style={headlineColor} className={classes.bigHeadline}>
      {props.children}
    </h1>
  )
}
