import { useState, useEffect } from 'react'
import classes from './Headline.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function Headline(props) {
  const [headlineColor, setHeadlineColor] = useState({})
  useEffect(() => {
    setHeadlineColor({ color: randomColorGenerator() })
  }, [])

  return (
    <h2 style={headlineColor} className={classes.h2}>
      {props.children}
    </h2>
  )
}
