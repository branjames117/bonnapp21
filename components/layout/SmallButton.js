import classes from './SmallButton.module.css'

export default function SmallButton(props) {
  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  )
}
