import classes from './Home.module.css'
import Card from '../layout/Card'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function Home(props) {
  const [session, loading] = useSession()

  return (
    <>
      {!loading && (
        <div className={classes.container}>
          <div>
            <Card>
              {(!session && (
                <h1
                  className={classes.h1}
                  style={{ color: randomColorGenerator() }}
                >
                  Welcome to BonnApp21
                </h1>
              )) || (
                <h1
                  className={classes.h1}
                  style={{ color: randomColorGenerator() }}
                >
                  Welcome Back to BonnApp21
                </h1>
              )}
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                What It Is
              </h2>
              <p className={classes.body}>
                This is an unofficial Bonnaroo 2021 festival companion app,
                built from the ground up as a labor of love and provided to all
                Bonnaroovians for the cost of nothing. Maybe hug me if you see
                me at Centeroo.
              </p>
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                But What's It Do
              </h2>
              <p className={classes.body}>
                You can check out the <Link href='/lineup'>Lineup</Link> for
                quick access to info about every show at the festival, including
                artist biographies and curated music videos, or filter shows
                based on your favorite <Link href='/genres'>Genres</Link>.
                There's social features, too. Think of it as a Facebook for you
                and your Roo friends, only I don't want your personal
                information to sell you things.
              </p>
            </Card>
            <Card>
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                Disclaimer
              </h2>
              <p className={classes.body}>
                This site is not affiliated with the Bonnaroo Music Festival,
                Superfly Presents, or AC Entertainment. Their official website
                is at <Link href='https://www.bonnaroo.com/'>bonnaroo.com</Link>
                , where you'll find all the official information.
              </p>
              <p className={classes.body}>
                Images used on this app were pulled from{' '}
                <Link href='https://en.wikipedia.org/wiki/Main_Page'>
                  Wikipedia
                </Link>{' '}
                and are shared under the{' '}
                <Link href='https://creativecommons.org/licenses/by-sa/2.5/'>
                  Creative Commons license
                </Link>
                , or are in the public domain, with author attribution in the
                alt and title attributes of each image tag.
              </p>
            </Card>
          </div>
          <div>
            {(!session && (
              <Card>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Why You Should Register
                </h2>
                <p className={classes.body}>
                  <Link href='/users/register'>Register</Link> an account with
                  only a username and a password to gain access to the app's
                  social features, including friends, commenting on pages, and
                  cataloging the shows you most want to see.
                </p>
                <p className={classes.body}>
                  If you're going to Bonnaroo 2021 in September, and you don't
                  want to waste tedious hours researching each individual show,
                  then don't. The hard work has been done for you, and it's all
                  right here.
                </p>
              </Card>
            )) || (
              <Card>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Thanks for Joining
                </h2>
                <p className={classes.body}>
                  As an authorized user, you can edit your profile to share a
                  little bit about yourself, add friends, show your excitement
                  for your favorite artists, and leave comments on user and
                  artist profiles.
                </p>
                <p className={classes.body}>
                  Thank you for showing your support, and I hope to see you on
                  the Farm!
                </p>
              </Card>
            )}
            <Card>{randomImageGenerator()}</Card>
            <Card>
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                How Was It Made
              </h2>
              <p className={classes.body}>
                Thanks for asking. I'm a self-taught web developer trying to
                build out a portfolio of cool projects that showcase what I'm
                learning to potential clients and employers. This is my second
                "big" project, my first being{' '}
                <Link href='http://peaceful-basin-76013.herokuapp.com/'>
                  LyriQuery
                </Link>
                , a database for searching through an artist's catalog to find
                instances of specific phrases. That was made with Node, Express,
                MongoDB, and Extended JavaScript.
              </p>
              <p className={classes.body}>
                For BonnApp21, I taught myself React and Next and also
                strengthened my grasp of MongoDB. Inspiration for the project
                came from the holy annual ritual of researching dozens of new
                artists I've never heard of for the purpose of planning my
                Bonnaroo experience. In the amount of time it might normally
                have taken me to perform this research, I built this app
                instead.
              </p>
            </Card>
            <Card>
              <h2
                className={classes.h2}
                style={{ color: randomColorGenerator() }}
              >
                How You Can Help
              </h2>
              <p className={classes.body}>
                Mainly, spread the word and get your friends registered to the
                site. But you can also help by assisting me in refining the
                database. If a performer was incorrectly documented, such as
                incorrect genre identification (I used wikipedia for the most
                part, but sometimes had to seek other sources when wikipedia
                pages weren't available), or if you feel a selected video
                doesn't accurately portray the performer, or if (OH NO!)
                something here breaks, then drop me an email at{' '}
                <a href='mailto:branjames117@gmail.com'>
                  branjames117@gmail.com
                </a>{' '}
                so I can make the necessary repairs.
              </p>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
