import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../layout/Button'
import InlineButton from '../layout/InlineButton'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import Card from '../layout/Card'
import timeConverter from '../../lib/time-converter'

export default function Main(props) {
  const [session, _] = useSession()
  const router = useRouter()

  return (
    <Card>
      <BigHeadline>
        {props.show.displayTitle && props.show.displayTitle.length !== '' ? (
          <span>{props.show.displayTitle}</span>
        ) : (
          <span>{props.show.title}</span>
        )}
      </BigHeadline>
      <h3>
        {props.show.day && props.show.day !== 'N/A' && (
          <span>{props.show.day}</span>
        )}
        {props.show.stage && props.show.stage !== 'N/A' && (
          <span> @ {props.show.stage}</span>
        )}
        {props.show.startTime && (
          <>
            <br />
            <span> {timeConverter(props.show.startTime)}</span>
          </>
        )}
        {props.show.endTime && (
          <span> - {timeConverter(props.show.endTime)}</span>
        )}
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
      <Headline>About the Show</Headline>
      <p className='preline'>
        {props.show.bio} <Link href={props.show.wiki}>...read more.</Link>
      </p>
      {props.show.site && (
        <p>
          <Link href={props.show.site}>Check out their website!</Link>
        </p>
      )}
      <Headline>Genres</Headline>
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
