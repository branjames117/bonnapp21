import { useContext } from 'react'
import { ThemeContext } from '../layout/ThemeContext'
import Link from 'next/link'
import classes from './GenreProfile.module.css'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import Card from '../layout/Card'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <>
      <div>
        <Card>
          <BigHeadline>Genre</BigHeadline>
          <Headline>What Is It?</Headline>
          <p>
            A music genre is a conventional category that identifies some pieces
            of music as belonging to a shared tradition or set of conventions.
            It is to be distinguished from musical form and musical style,
            although in practice these terms are sometimes used interchangeably.
          </p>
          <p>
            Music can be divided into genres in varying ways, such as popular
            music and art music, or religious music and secular music. The
            artistic nature of music means that these classifications are often
            subjective and controversial, and some genres may overlap.{' '}
            <Link href={'https://en.wikipedia.org/wiki/Music_genre'}>
              ...read more.
            </Link>
          </p>
          <p>
            Author's note: For each show, I determined the genre based not on my
            own subjective listening experience but on whatever information was
            available to me on the web, be it Wikipedia or Spotify or a news
            article or a blog post.
          </p>
        </Card>
        <span className='hider'>
          <Card>{randomImageGenerator(darkTheme)}</Card>
        </span>
      </div>
      <div>
        <Card>
          <BigHeadline>Pick Your Poison</BigHeadline>
          {/* divide the list of genres into two columns */}
          <div className={classes.listSplitter}>
            <div>
              {props.genres.map((genreArray, idx) =>
                idx % 2 === 0 ? (
                  <div key={genreArray[0]}>
                    <Link href={`/genres/${genreArray[0]}`}>
                      {`${genreArray[0]} (${genreArray[1]})`}
                    </Link>
                  </div>
                ) : null
              )}
            </div>
            <div>
              {props.genres.map((genreArray, idx) =>
                idx % 2 !== 0 ? (
                  <div key={genreArray[0]}>
                    <Link href={`/genres/${genreArray[0]}`}>
                      {`${genreArray[0]} (${genreArray[1]})`}
                    </Link>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
