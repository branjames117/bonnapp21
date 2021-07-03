import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Card from '../layout/Card'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function Home() {
  const [session, loading] = useSession()

  return (
    <>
      <div>
        <Card>
          <h1 style={{ color: randomColorGenerator() }}>
            {!session ? (
              <>Welcome to BonnApp21</>
            ) : (
              <>Welcome Back to BonnApp21</>
            )}
          </h1>

          <h2 style={{ color: randomColorGenerator() }}>What It Is</h2>
          <p>
            This is an unofficial Bonnaroo 2021 festival companion app, built
            from the ground up as a labor of love and provided to all
            Bonnaroovians for the cost of a high-five if you see me at Centeroo.
          </p>
          <h2 style={{ color: randomColorGenerator() }}>But What's It Do</h2>
          <p>
            You can check out the <Link href='/shows/'>Lineup</Link> for quick
            access to info about every show at the festival, including artist
            biographies and curated music videos, or filter shows based on your
            favorite <Link href='/genres'>Genres</Link>. There's social
            features, too. Think of it as a Facebook for you and your Roo
            friends, only I don't want your personal information to sell you
            things.
          </p>
        </Card>
        {!session ? (
          <Card>
            <h2 style={{ color: randomColorGenerator() }}>
              Why You Should Register
            </h2>
            <p>
              <Link href='/register'>Register</Link> an account with only a
              username and a password to gain access to the app's social
              features, including friends, commenting on pages, and cataloging
              the shows you most want to see.
            </p>
            <p>
              If you're going to Bonnaroo 2021 in September, and you don't want
              to waste tedious hours researching each individual show, then
              don't. The hard work has been done for you, and it's all right
              here.
            </p>
          </Card>
        ) : (
          <Card>
            <h2 style={{ color: randomColorGenerator() }}>
              Thank You for Signing Up
            </h2>
            <p>
              As an authorized user, you can edit your profile to share a little
              bit about yourself, add friends, show your excitement for your
              favorite artists, and leave comments on user and artist profiles.
            </p>
            <p>
              Thank you for showing your support, and I hope to see you on the
              Farm!
            </p>
          </Card>
        )}
        {!loading && (
          <span className='hider'>
            <Card>{randomImageGenerator()}</Card>
          </span>
        )}
      </div>
      <div>
        <Card>
          <h2 style={{ color: randomColorGenerator() }}>How Was It Made</h2>
          <p>
            Thanks for asking. I'm a self-taught web developer trying to build
            out a portfolio of cool projects that showcase what I'm learning to
            potential clients and employers. This is my second "big" project, my
            first being{' '}
            <Link href='http://peaceful-basin-76013.herokuapp.com/'>
              LyriQuery
            </Link>
            , a database for searching through an artist's catalog to find
            instances of specific phrases. That was made with Node, Express,
            MongoDB, and Extended JavaScript.
          </p>
          <p>
            For BonnApp21, I taught myself React and Next and also strengthened
            my grasp of MongoDB. Inspiration for the project came from the holy
            annual ritual of researching dozens of new artists I've never heard
            of for the purpose of planning my Bonnaroo experience. In the amount
            of time it might normally have taken me to perform this research, I
            built this app instead.
          </p>
        </Card>
        {!loading && (
          <span className='hider'>
            <Card>{randomImageGenerator()}</Card>
          </span>
        )}
        <Card>
          <h2 style={{ color: randomColorGenerator() }}>How You Can Help</h2>
          <p>
            Spread the word and get your friends registered to the site. But you
            can also help by assisting me in refining the database. If a
            performer was incorrectly documented, such as incorrect genre
            identification, or if (OH NO!) something here breaks, then drop me
            an email at{' '}
            <a href='mailto:branjames117@gmail.com'>branjames117@gmail.com</a>{' '}
            so I can make the necessary repairs.
          </p>
        </Card>
        <Card>
          <h2 style={{ color: randomColorGenerator() }}>Legal</h2>
          <p>
            This site is not affiliated with the Bonnaroo Music Festival,
            Superfly Presents, or AC Entertainment. The official website for the
            festival is at{' '}
            <Link href='https://www.bonnaroo.com/'>bonnaroo.com</Link>, where
            you'll find all the official information as well as a bunch of other
            cool things.
          </p>
        </Card>
      </div>
    </>
  )
}
