import classes from './Container.module.css'

/* Container wraps around the entire app and controls, various style settings, keeps the footer at the bottom of the page */

export default function Container(props) {
  // const { darkTheme } = useContext(ThemeContext)
  return <div className={classes.container}>{props.children}</div>
}
