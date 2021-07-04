import { useState, useEffect } from 'react'
import classes from './InlineButton.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function InlineButton(props) {
  const [buttonColor, setButtonColor] = useState({})
  useEffect(() => {
    setButtonColor({ backgroundColor: randomColorGenerator() })
  }, [])

  return (
    <button style={buttonColor} onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
