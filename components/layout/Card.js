import { useState, useEffect } from 'react'
import classes from './Card.module.css'
import { randomColorGeneratorBlueless } from '../../lib/random-colors'

export default function Card(props) {
  const [cardColor, setCardColor] = useState({})
  useEffect(() => {
    setCardColor({ color: randomColorGeneratorBlueless() })
  }, [])

  return (
    <div style={cardColor} className={classes.card}>
      {props.children}
    </div>
  )
}
