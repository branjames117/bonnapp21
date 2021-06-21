import Link from 'next/link'
import classes from './GenreProfile.module.css'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  return (
    <>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            Genre
          </h1>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            What Is It?
          </h2>
          <p className={classes.p}>
            A music genre is a conventional category that identifies some pieces
            of music as belonging to a shared tradition or set of conventions.
            It is to be distinguished from musical form and musical style,
            although in practice these terms are sometimes used interchangeably.
          </p>
          <p className={classes.p}>
            Music can be divided into genres in varying ways, such as popular
            music and art music, or religious music and secular music. The
            artistic nature of music means that these classifications are often
            subjective and controversial, and some genres may overlap.{' '}
            <Link href={'https://en.wikipedia.org/wiki/Music_genre'}>
              (Source)
            </Link>
          </p>
          <p className={classes.p}>
            Author's note: For each show, I determined the genre based not on my
            own subjective listening experience but on whatever information was
            available to me on the web, be it Wikipedia or Spotify or a news
            article or a blog post.
          </p>
        </Card>
        <span className={classes.hider}>
          <Card>{randomImageGenerator()}</Card>
        </span>
      </div>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            Pick Your Poison
          </h1>
          <div className={classes.listSplitter}>
            <div>
              {props.genres.map((genre, idx) =>
                idx % 2 === 0 ? (
                  <p key={genre}>
                    <Link href={`/genres/${genre}`}>{genre}</Link>
                  </p>
                ) : null
              )}
            </div>
            <div>
              {props.genres.map((genre, idx) =>
                idx % 2 !== 0 ? (
                  <p key={genre}>
                    <Link href={`/genres/${genre}`}>{genre}</Link>
                  </p>
                ) : null
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
