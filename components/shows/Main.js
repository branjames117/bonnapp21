import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../layout/Button'
import InlineButton from '../layout/InlineButton'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'

export default function Main(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <Card>
      <h1 style={{ color: randomColorGenerator() }}>
        {props.show.displayTitle && props.show.displayTitle.length !== '' ? (
          <span>{props.show.displayTitle}</span>
        ) : (
          <span>{props.show.title}</span>
        )}
      </h1>
      <h3>
        {props.show.day && props.show.day !== 'N/A' && (
          <span>Playing {props.show.day}</span>
        )}
        {props.show.stage && props.show.stage !== 'N/A' && (
          <span> at {props.show.stage}</span>
        )}
        {props.show.startTime && <span> from {props.show.startTime}</span>}
        {props.show.endTime && <span> to {props.show.endTime}</span>}
      </h3>
      {session && session.user.name === 'admin' && (
        <p>
          <Button
            onClick={() =>
              router.push(`/shows/edit?showName=${props.show.title}`)
            }
          >
            edit show
          </Button>
        </p>
      )}
      <p>
        {props.show.prevShow && props.show.prevShow !== '' && (
          <InlineButton
            onClick={() => router.push(`/shows/${props.show.prevShow}`)}
          >
            <>Prev. Show</>
          </InlineButton>
        )}
        <InlineButton onClick={() => router.push('/random-show')}>
          Shuffle
        </InlineButton>
        {props.show.nextShow && props.show.nextShow !== '' && (
          <InlineButton
            onClick={() => router.push(`/shows/${props.show.nextShow}`)}
          >
            <>Next Show</>
          </InlineButton>
        )}
      </p>
      <h2 style={{ color: randomColorGenerator() }}>About the Show</h2>
      <p className='preline'>
        {props.show.bio} <Link href={props.show.wiki}>...read more.</Link>
      </p>
      {props.show.site && (
        <p>
          <Link href={props.show.site}>Check out their website!</Link>
        </p>
      )}
      <h2 style={{ color: randomColorGenerator() }}>Genres</h2>
      <p>
        <ul>
          {props.show.genres.map((genre) => (
            <li key={genre}>
              <Link href={`/genres/${genre}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      </p>
    </Card>
  )
}
