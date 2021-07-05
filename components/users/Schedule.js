import Link from 'next/link'
import { useSession } from 'next-auth/client'
import Card from '../layout/Card'
import SmallButton from '../layout/SmallButton'
import Spinner from '../layout/Spinner'
import { useState, useEffect } from 'react'
import Headline from '../layout/Headline'

const daysOfRoo = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Who Stage']

export default function Schedule(props) {
  const [session, _] = useSession()
  const [shows, setShows] = useState([[], [], [], [], []])
  const [loading, setLoading] = useState(false)

  /* upon first loading profile, load the profile's schedule */
  useEffect(async () => {
    setLoading(true)

    const response = await fetch('/api/user/schedule', {
      method: 'POST',
      body: JSON.stringify({ username: props.username }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    setShows(data.showSchedule)
    setLoading(false)
    /* set props as dependency so useEffect reruns on new profile */
  }, [props])

  /* handler for deleting show from schedule */
  async function onDeleteShow(e) {
    setLoading(true)
    e.preventDefault()

    const showData = {
      showname: e.target.value,
      username: session.user.name,
    }

    const response = await fetch('/api/user/schedule', {
      method: 'DELETE',
      body: JSON.stringify(showData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await response.json()

    setShows(data.showSchedule)
    setLoading(false)
    return
  }

  function isScheduleEmpty() {
    let numberOfShows = 0
    shows.forEach((dayOfRoo) => (numberOfShows += dayOfRoo.length))
    if (numberOfShows === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <Card>
      <Headline>
        {!props.myPage ? <>{props.username}'s</> : <>Your Show</>} Schedule
      </Headline>
      <div>
        {loading && <Spinner />}
        {(!loading && isScheduleEmpty() && (
          <>
            {props.myPage ? (
              <>
                <p>Your schedule is looking pretty sparse.</p>
                <p>
                  <Link href={'/random-show'}>Want a random suggestion?</Link>
                </p>
              </>
            ) : (
              <>
                <p>Their schedule is looking pretty sparse!</p>
                <p>
                  <Link href={'/random-show'}>Go to a random suggestion.</Link>
                </p>
              </>
            )}
          </>
        )) ||
          (!loading && (
            <>
              {' '}
              <ul>
                {/* render if schedule is not empty */}
                {shows.map((day, idx) => (
                  <span key={shows.indexOf(day)}>
                    {/* render day of week only if shows are scheduled for that day */}
                    {day.length !== 0 && (
                      <h3 key={daysOfRoo[idx]}>{daysOfRoo[idx]}</h3>
                    )}
                    {day.map((show) => (
                      <li key={show.title}>
                        {props.myPage && (
                          <SmallButton
                            value={show.title}
                            onClick={onDeleteShow}
                          >
                            x
                          </SmallButton>
                        )}
                        {show.startTime && show.endTime && (
                          <>
                            {show.startTime} - {show.endTime}{' '}
                          </>
                        )}
                        <Link href={`/shows/${show.title}`}>{show.title}</Link>
                      </li>
                    ))}
                  </span>
                ))}
              </ul>
              <p>
                <Link href={'/random-show'}>Go to a random suggestion.</Link>
              </p>
            </>
          ))}
      </div>
    </Card>
  )
}
