import styles from './Grid.module.css'

/* Grid wraps around select components and creates
a responsive 2-column grid */

export default function Grid(props) {
  return <div className={styles.grid}>{props.children}</div>
}
