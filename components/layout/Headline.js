import { useState, useEffect } from 'react'
import classes from './Headline.module.css'
import randomColorGenerator from '../../lib/random-colors'

/* sticking some H2's into their own component with a useEffect so their color doesn't change with every state update */

export default function Headline(props) {
  const [headlineColor, setHeadlineColor] = useState({})
  useEffect(() => {
    setHeadlineColor({ color: randomColorGenerator() })
  }, [])

  return (
    <h2 style={headlineColor} className={classes.headline}>
      {props.children}
    </h2>
  )
}
