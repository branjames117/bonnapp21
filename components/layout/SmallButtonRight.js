import classes from './SmallButtonRight.module.css'

export default function SmallButtonRight(props) {
  return (
    <button value={props.value} onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
