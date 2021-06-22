import classes from './Bio.module.css'
import randomColorGenerator from '../../lib/random-colors'

export default function Bio(props) {
  return (
    <>
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        About Me
      </h2>
      <p className={classes.bioBody}>{props.user.bio}</p>
      {/* Conditionally display available information */}
      <table className={classes.table}>
        <tbody>
          {props.user.firstname && (
            <tr>
              <td>First Name</td>
              <td align='right'>{props.user.firstname}</td>
            </tr>
          )}
          {props.user.birthday && (
            <tr>
              <td>Birthday</td>
              <td align='right'>{props.user.birthday}</td>
            </tr>
          )}
          <tr>
            <td>Joined</td>
            <td align='right'>{props.user.joined}</td>
          </tr>
          {props.user.location && (
            <tr>
              <td>Location</td>
              <td align='right'>{props.user.location}</td>
            </tr>
          )}
          {props.user.bonnaroos && (
            <tr>
              <td>Roos Attended</td>
              <td align='right'>{props.user.bonnaroos}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}