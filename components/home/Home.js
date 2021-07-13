import { useContext } from 'react'
import { ThemeContext } from '../layout/ThemeContext'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Card from '../layout/Card'
import BigHeadline from '../layout/BigHeadline'
import Headline from '../layout/Headline'
import randomImageGenerator from '../../lib/random-images'

export default function Home() {
  const { darkTheme } = useContext(ThemeContext)
  const [session, loading] = useSession()

  return (
    <>
      <div>
        <Card>
          <BigHeadline>
            {!session ? (
              <>Welcome to BonnApp21</>
            ) : (
              <>Welcome Back to BonnApp21</>
            )}
          </BigHeadline>

          <Headline>What It Is</Headline>
          <p>
            This is an unofficial Bonnaroo 2021 festival companion app, built
            from the ground up as a labor of love and provided to all
            Bonnaroovians.
          </p>
          <Headline>But What's It Do</Headline>
          <p>
            You can check out the <Link href='/shows/'>Lineup</Link> for quick
            access to info about every show at the festival, including artist
            biographies and curated music videos, or filter shows based on your
            favorite <Link href='/genres'>Genres</Link>. There's social
            features, too. Think of it as a Facebook for you and your Roo
            friends, only I don't want your personal information to sell you
            things.
          </p>
          <p>
            When the showtimes are announced, the database will be updated, and
            all the shows you "follow" on your profile page will be organized
            chronologically, including which stage to go to. This will be a
            quick convenient schedule for you to refer to while you're at the
            festival!
          </p>
        </Card>
        {!session ? (
          <Card>
            <Headline>Why You Should Register</Headline>
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
            <Headline>Thank You for Signing Up</Headline>
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
            <Card>{randomImageGenerator(darkTheme)}</Card>
          </span>
        )}
      </div>
      <div>
        <Card>
          <Headline>Breaking News</Headline>
          <h3>9 July 2021</h3>
          <p>
            Well, there were some lineup changes, so I've had to modify the
            database. The big changes are as follows: Rufus du Sol replaces Lana
            Del Rey, Khruangbin replaces Deftones, and Janelle Monae, King
            Gizzard & the Lizard Wizard, and Nubya Garcia are all out for
            reasons unknown. The other change is that everyone who was
            previously only performing on the Who Stage have now been given
            dates and are added to the regular lineup.
          </p>
        </Card>
        <Card>
          <Headline>How Was It Made</Headline>
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
            <Card>{randomImageGenerator(darkTheme)}</Card>
          </span>
        )}
        <Card>
          <Headline>How You Can Help</Headline>
          <p>
            Spread the word and get your friends registered to the site. You can
            also help me refine the database. If a performer was incorrectly
            documented, such as incorrect genre identification, or if (OH NO!)
            something here breaks, or if you just have a really cool idea you'd
            like to see implemented, then drop me an email at{' '}
            <a href='mailto:branjames117@gmail.com'>branjames117@gmail.com</a>{' '}
            or leave a comment on the <Link href='/user/admin'>admin</Link>{' '}
            profile page.
          </p>
        </Card>
        <Card>
          <Headline>Legal</Headline>
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
