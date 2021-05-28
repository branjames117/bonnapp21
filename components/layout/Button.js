import classes from './Button.module.css'

export default function Button(props) {
  return <button className={classes.btn}>{props.children}</button>
}
