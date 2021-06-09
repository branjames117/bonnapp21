import classes from './Card.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function Card(props) {
  return (
    <div
      style={{ borderColor: randomColorGenerator() }}
      className={classes.card}
    >
      {props.children}
    </div>
  )
}
