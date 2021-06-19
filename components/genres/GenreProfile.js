import Link from 'next/link'
import classes from './GenreProfile.module.css'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  return (
    <div className={classes.grid}>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            {props.genre.name}
          </h1>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            What Is It?
          </h2>
          <p className={classes.p}>
            {props.genre.def} <Link href={props.genre.wiki}> (Source)</Link>
          </p>
        </Card>
        <Card>{randomImageGenerator()}</Card>
      </div>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            Matches
          </h1>
          {props.shows.map((show) => (
            <>
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
                  <span className={classes.genre}>
                    <Link href={`/genres/${genre}`}>{genre}</Link>
                  </span>
                ))}
              </p>
            </>
          ))}
        </Card>
      </div>
    </div>
  )
}
