import { useState, useEffect } from 'react'
import classes from './Card.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function Card(props) {
  const [cardColor, setCardColor] = useState({})
  useEffect(() => {
    setCardColor({ color: randomColorGenerator() })
  }, [])

  return (
    <div style={cardColor} className={classes.card}>
      {props.children}
    </div>
  )
}
