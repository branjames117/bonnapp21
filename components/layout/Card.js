import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import classes from './Card.module.css'
import { randomColorGeneratorBlueless } from '../../lib/random-colors'

export default function Card(props) {
  const { darkTheme } = useContext(ThemeContext)
  const [cardColor, setCardColor] = useState({})
  useEffect(() => {
    darkTheme
      ? setCardColor({ color: '#ddd' })
      : setCardColor({ color: randomColorGeneratorBlueless() })
  }, [darkTheme])

  return (
    <div style={cardColor} className={classes.card}>
      {props.children}
    </div>
  )
}
