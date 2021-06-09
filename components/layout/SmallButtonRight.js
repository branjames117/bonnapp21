import classes from './SmallButtonRight.module.css'

export default function SmallButtonRight(props) {
  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
