import classes from './Spinner.module.css'

export default function Spinner() {
  return (
    <p>
      <div className={classes.ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </p>
  )
}
