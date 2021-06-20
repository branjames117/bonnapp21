import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../layout/Button'
import classes from './Main.module.css'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'

export default function Main(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <Card>
      <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
        {props.show.title}
      </h1>
      {session && session.user.name === 'admin' && (
        <>
          <Button
            onClick={() =>
              router.push(`/shows/edit?showName=${props.show.title}`)
            }
          >
            edit show
          </Button>
        </>
      )}
      {props.show.site && (
        <div className={classes.body}>
          <Link href={props.show.site}>Visit Their Official Site</Link>
        </div>
      )}
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        About the Show
      </h2>
      <table className={classes.table}>
        <tbody>
          {props.show.day && props.show.day !== 'N/A' && (
            <tr>
              <td>Day</td>
              <td align='right'>{props.show.day}</td>
            </tr>
          )}
          {props.show.startTime && (
            <tr>
              <td>Start Time</td>
              <td align='right'>{props.show.startTime}</td>
            </tr>
          )}
          {props.show.endTime && (
            <tr>
              <td>End Time</td>
              <td align='right'>{props.show.endTime}</td>
            </tr>
          )}
          {props.show.stage && props.show.stage !== 'N/A' && (
            <tr>
              <td>Location</td>
              <td align='right'>{props.show.stage}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
        {props.show.bio} <Link href={props.show.wiki}> (Source)</Link>
      </p>

      <div className={classes.body}>
        <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
          Genres
        </h2>
        {props.show.genres.map((genre) => (
          <>
            <Link href={`/genres/${genre}`} key={genre}>
              {genre}
            </Link>
            <br />
          </>
        ))}
      </div>
    </Card>
  )
}
