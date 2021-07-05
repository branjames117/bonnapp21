import { useContext } from 'react'
import { ThemeContext } from '../layout/ThemeContext'
import classes from './Bio.module.css'
import Social from './Social'
import Headline from '../layout/Headline'

export default function Bio(props) {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <>
      <Headline>
        About Me{' '}
        <Social
          facebookURL={props.user.facebookURL}
          instaURL={props.user.instaURL}
          twitterURL={props.user.twitterURL}
        />
      </Headline>
      <p className='preline'>{props.user.bio}</p>
      {/* Conditionally display available information */}
      <table className={darkTheme ? classes.bioTableDark : classes.bioTable}>
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
