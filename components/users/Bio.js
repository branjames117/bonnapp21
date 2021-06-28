import classes from './Bio.module.css'
import Social from './Social'
import randomColorGenerator from '../../lib/random-colors'

export default function Bio(props) {
  return (
    <>
      <h2 style={{ color: randomColorGenerator() }}>
        About Me{' '}
        <Social
          facebookURL={props.user.facebookURL}
          instaURL={props.user.instaURL}
          twitterURL={props.user.twitterURL}
        />
      </h2>
      <p className='preline'>{props.user.bio}</p>
      {/* Conditionally display available information */}
      <table className={classes.bioTable}>
        <tbody>
          {props.user.firstname && (
            <tr>
              <td>First Name</td>
              <td align='right'>{props.user.firstname}</td>
            </tr>
          )}
          {props.user.birthday && (
            <tr>
              <td>Born On</td>
              <td align='right'>{props.user.birthday}</td>
            </tr>
          )}
          <tr>
            <td>Signed Up</td>
            <td align='right'>{props.user.joined}</td>
          </tr>
          {props.user.location && (
            <tr>
              <td>Hometown</td>
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
