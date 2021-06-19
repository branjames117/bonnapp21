import { useState, useEffect } from 'react'
import classes from './Headline.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function Headline(props) {
  const [headlineColor, setHeadlineColor] = useState({})
  useEffect(() => {
    setHeadlineColor({ color: randomColorGenerator() })
  }, [])

  return (
    <h1 style={headlineColor} className={classes.h1}>
      {props.children}
    </h1>
  )
}
