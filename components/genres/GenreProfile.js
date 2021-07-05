import { useContext } from 'react'
import { ThemeContext } from '../layout/ThemeContext'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classes from './GenreProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function GenreProfile(props) {
  const { darkTheme } = useContext(ThemeContext)
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <>
      <div>
        <Card>
          <BigHeadline>{props.genre.name}</BigHeadline>
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
          <Headline>What Is It?</Headline>
          <p className='preline'>
            {props.genre.def}{' '}
            <Link href={props.genre.wiki}> ...read more.</Link>
          </p>
        </Card>
        <span className='hider'>
          <Card>{randomImageGenerator(darkTheme)}</Card>
        </span>
      </div>
      <div>
        <Card>
          <BigHeadline>Matches</BigHeadline>
          {props.shows.map((show) => (
            <span key={show.title}>
              <Headline>
                <Link href={`/shows/${show.title}`}>
                  <a style={darkTheme ? {} : { color: randomColorGenerator() }}>
                    {show.title}
                  </a>
                </Link>
              </Headline>
              <p className='preline'>{show.bio}</p>
              <p>
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
