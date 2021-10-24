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
          <h3> + + + 24 October 2021 + + + </h3>
          <p>
            Well, at this point it's not news, but Bonnaroo 2021 was cancelled
            for muddy campground conditions! Since then, I've been working
            through the Vanderbilt Coding Boot Camp, developing my portfolio and
            hard skills in the hopes of turning this web development passion of
            mine into an actual career. I'll keep this website live, along with
            the database storing user information, for posterity's sake. And
            when Bonnaroo 2022 rolls around next year, the new-and-improved
            BonnApp22 will be ready and waiting.
          </p>
          <p>See you then!</p>
          <h3> + + + 13 August 2021 + + + </h3>
          <p>
            Show times have been revealed and the BonnApp database has been
            updated accordingly. I've also switched over from using a 24-hour
            time format to the more U.S.-familiar 12-hour format, to improve the
            readability of the schedule. Again, as a reminder, be sure to
            screenshot your schedule before you get out there and find this app
            inaccessible due to poor network availability. As a final change, I
            made the lineup page the root route, since that's what everyone
            wants to see when they come here anyway.
          </p>
          <h3> + + + 5 August 2021 + + + </h3>
          <p>
            There have been a few more lineup changes. Blossom and Zach Bryan
            will be there on Thursday, with Spock stepping out. Mastodon will be
            there on Friday. No changes to Saturday or Sunday.
          </p>
          <p>
            Furthermore, the "special guests" featured in Thursday's Grand Ole
            Opry performance have been revealed: Tommy Emmanuel, Dom Flemons,
            Chris Janson, Amythyst Kiah, Riders in the Sky, Maggie Rose, The
            Travelin' McCourys, and Chris Shiflett, plus the Opry Square Dancers
            and announcer Bill Cody. These performers will not get individual
            pages in the database, but they will be referenced on Grand Ole
            Opry's. For more information on each guest, hit that Google box.
          </p>
          <p>
            This app is more or less finished as far as features go, but when
            the official showtimes are released, along with stages, I'll upload
            the database, and that information will automatically appear in the{' '}
            <strong>Your Show Schedule</strong> section of your profile for each
            performer you're following. This should help you plan your days on
            the Farm and handle any scheduling conflicts that might arise.
            Internet connections are shoddy out there, so be sure to take a
            screenshot of your schedule for later reference, because you likely
            won't be able to reach this website out in the boondocks of
            Manchester.
          </p>
          <h3> + + + 9 July 2021 + + + </h3>
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
