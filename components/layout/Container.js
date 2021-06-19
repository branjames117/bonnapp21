import styles from './Container.module.css'

/* Container wraps around the entire app and controls, various style settings */

export default function Container(props) {
  return <div className={styles.container}>{props.children}</div>
}
