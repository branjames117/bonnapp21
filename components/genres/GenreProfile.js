import classes from './GenreProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Link from 'next/link'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  return (
    <div className={classes.container}>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            {props.genre.name}
          </h1>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            Definition
          </h2>
          <p>
            {props.genre.def} <Link href={props.genre.wiki}> (Source)</Link>
          </p>
        </Card>
        <Card>{randomImageGenerator()}</Card>
      </div>
      <div>
        {props.shows.map((show) => (
          <Card>
            <h2
              className={classes.h2}
              style={{ color: randomColorGenerator() }}
            >
              <Link href={`/shows/${show.title}`}>
                <a style={{ color: randomColorGenerator() }}>{show.title}</a>
              </Link>
            </h2>
            <p className={classes.body}>{show.bio}</p>
            <p>
              {show.genres.map((genre) => (
                <span className={classes.genre}>
                  <Link href={`/genres/${genre}`}>{genre}</Link>
                </span>
              ))}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
