import classes from './Card.module.css'

export default function Card(props) {
  return (
    <div style={{ backgroundColor: props.color }} className={classes.card}>
      {props.children}
    </div>
  )
}
