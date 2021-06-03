import classes from './Button.module.css'

export default function Button(props) {
  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
