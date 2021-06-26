import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classes from './GenreProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            {props.genre.name}
          </h1>
          {session && session.user.name === 'admin' && (
            <>
              <Button
                onClick={() =>
                  router.push(`/genres/edit?genreName=${props.genre.name}`)
                }
              >
                edit genre
              </Button>
            </>
          )}
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            What Is It?
          </h2>
          <p className={classes.p}>
            {props.genre.def}{' '}
            <Link href={props.genre.wiki}> ...read more.</Link>
          </p>
        </Card>
        <span className={classes.hider}>
          <Card>{randomImageGenerator()}</Card>
        </span>
      </div>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            Matches
          </h1>
          {props.shows.map((show) => (
            <span key={show.title}>
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                <Link href={`/shows/${show.title}`}>
                  <a style={{ color: randomColorGenerator() }}>{show.title}</a>
                </Link>
              </h2>
              <p className={classes.p}>{show.bio}</p>
              <p className={classes.genres}>
                {show.genres.map((genre) => (
                  <span className={classes.genre} key={genre}>
                    <Link href={`/genres/${genre}`}>{genre}</Link>
                  </span>
                ))}
              </p>
            </span>
          ))}
        </Card>
      </div>
    </>
  )
}
