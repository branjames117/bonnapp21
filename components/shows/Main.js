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
      <h3>
        {props.show.day && props.show.day !== 'N/A' && (
          <span>Playing {props.show.day}</span>
        )}
        {props.show.stage && <span> at {props.show.stage}</span>}
        {props.show.startTime && <span> from {props.show.startTime}</span>}
        {props.show.endTime && <span> to {props.show.endTime}</span>}
      </h3>
      {session && session.user.name === 'admin' && (
        <p className={classes.body}>
          <Button
            onClick={() =>
              router.push(`/shows/edit?showName=${props.show.title}`)
            }
          >
            edit show
          </Button>
        </p>
      )}
      {props.show.site && (
        <div className={classes.body}>
          <Link href={props.show.site}>Visit Their Official Site</Link>
        </div>
      )}
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        About the Show
      </h2>

      <p className={classes.bio}>
        {props.show.bio.replace(/\\n/g, '\n')}{' '}
        <Link href={props.show.wiki}> (Source)</Link>
      </p>

      <div className={classes.body}>
        <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
          Genres
        </h2>
        {props.show.genres.map((genre) => (
          <p key={genre}>
            <Link href={`/genres/${genre}`}>{genre}</Link>
          </p>
        ))}
      </div>
    </Card>
  )
}
