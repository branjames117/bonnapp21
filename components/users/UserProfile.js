import { useRef } from 'react'
import classes from './UserProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import SmallButton from '../layout/SmallButton'
import SmallButtonRight from '../layout/SmallButtonRight'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import randomColorGenerator from '../../lib/random-colors'
import randomImageGenerator from '../../lib/random-images'

export default function UserProfile(props) {
  const [session, loading] = useSession()
  const commentInputRef = useRef()
  const router = useRouter()

  /* logic to determine profile ownership */
  let loggedIn = session ? true : false
  let myPage
  if (loggedIn) {
    myPage = session.user.name === props.user.username ? true : false
  } else {
    myPage = false
  }

  function onAddCommentHandler(e) {
    e.preventDefault()

    const enteredBody = commentInputRef.current.value
    const commentAuthor = session.user.name
    const targetedUser = props.user.username

    const commentData = {
      body: enteredBody,
      author: commentAuthor,
      username: targetedUser,
    }

    commentInputRef.current.value = ''

    props.onAddComment(commentData)
  }

  function onDeleteCommentHandler(e) {
    e.preventDefault()

    const commentData = {
      commentID: e.target.value,
      username: props.user.username,
    }

    props.onDeleteComment(commentData)
  }

  function editProfileHandler() {
    router.push('/users/edit')
  }

  function onAddFriend() {
    const friendData = {
      username: session.user.name,
      friendName: props.user.username,
    }

    props.onAddFriend(friendData)
  }

  function onDeleteFriend(friend = props.user.username) {
    const friendData = {
      username: session.user.name,
      friendName: friend,
    }

    props.onDeleteFriend(friendData)
  }

  function onDeleteExcitedUser(show = props.show.title) {
    const excitedData = {
      user: session.user.name,
      show: show,
    }

    props.onDeleteExcitedUser(excitedData)
  }

  return (
    <>
      {session && loading && <p>Pulling profile from database...</p>}
      {!loading && (
        <div className={classes.container}>
          {/* LEFT-SIDE PANE */}
          <div>
            <Card>
              <h1
                className={classes.h1}
                style={{ color: randomColorGenerator() }}
              >
                {props.user.username}
              </h1>
              {/* Conditionally allow user to edit profile */}
              {myPage && (
                <Button onClick={editProfileHandler}>edit profile</Button>
              )}
              {myPage && session.user.name === 'admin' && (
                <>
                  <br />
                  <Link href='/admin/show'>
                    <Button>add show</Button>
                  </Link>
                  <br />
                  <Link href='/admin/genre'>
                    <Button>add genre</Button>
                  </Link>
                </>
              )}
              <div className={classes.body}>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  About Me
                </h2>
                <p className={classes.p}>{props.user.bio}</p>
                {/* Conditionally display available information */}
                <table className={classes.table}>
                  <tbody>
                    {props.user.firstname && (
                      <tr>
                        <td>First Name</td>
                        <td align='right'>{props.user.firstname}</td>
                      </tr>
                    )}
                    {props.user.birthday && (
                      <tr>
                        <td>Birthday</td>
                        <td align='right'>{props.user.birthday}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Joined</td>
                      <td align='right'>{props.user.joined}</td>
                    </tr>
                    {props.user.location && (
                      <tr>
                        <td>Location</td>
                        <td align='right'>{props.user.location}</td>
                      </tr>
                    )}
                    {props.user.bonnaroos && (
                      <tr>
                        <td>Roos Attended</td>
                        <td align='right'>{props.user.bonnaroos}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {(props.user.facebookURL ||
                  props.user.instaURL ||
                  props.user.twitterURL) && (
                  <>
                    <h2
                      className={classes.h2}
                      style={{ color: randomColorGenerator() }}
                    >
                      Social
                    </h2>
                    <div className={classes.social}>
                      {props.user.facebookURL && (
                        <div>
                          <Link href={props.user.facebookURL}>
                            <svg
                              className={classes.svg}
                              width='24'
                              height='24'
                              viewBox='0 0 1000 1000'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0 M 690 1000C 690 1000 534 1000 534 1000C 534 1000 534 613 534 613C 534 613 404 613 404 613C 404 613 404 462 404 462C 404 462 534 462 534 462C 534 462 534 350 534 350C 534 221 613 151 729 151C 784 151 831 155 845 157C 845 157 845 292 845 292C 845 292 765 292 765 292C 702 292 690 322 690 365C 690 365 690 462 690 462C 690 462 840 462 840 462C 840 462 820 613 820 613C 820 613 690 613 690 613C 690 613 690 1000 690 1000' />
                            </svg>
                          </Link>
                        </div>
                      )}
                      {props.user.instaURL && (
                        <div>
                          <Link href={props.user.instaURL}>
                            <svg
                              className={classes.svg}
                              width='24'
                              height='24'
                              viewBox='0 0 1000 1000'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M 503 25C 631 25 647 26 697 28C 748 30 782 38 812 50C 843 62 870 78 896 105C 922 131 938 157 950 188C 962 218 970 253 972 303C 975 353 975 369 975 498C 975 626 975 642 972 693C 970 743 962 777 950 807C 938 838 922 865 896 891C 870 917 843 934 812 946C 782 957 748 965 698 968C 647 970 631 970 503 970C 374 970 358 970 308 968C 257 965 223 957 193 946C 162 934 136 917 109 891C 83 865 67 838 55 807C 43 777 35 743 33 693C 31 642 30 626 30 498C 30 369 31 353 33 303C 35 253 43 218 55 188C 67 157 83 131 109 105C 136 78 162 62 193 50C 223 38 258 30 308 28C 358 26 374 25 503 25C 503 25 503 25 503 25M 460 110C 372 110 355 111 312 113C 266 115 241 123 224 129C 202 138 186 148 170 165C 153 181 143 197 134 219C 128 236 120 261 118 307C 116 356 115 371 115 498C 115 624 116 639 118 689C 120 735 128 760 134 776C 143 798 153 814 170 831C 186 847 202 857 224 866C 241 872 266 880 312 882C 362 885 377 885 503 885C 629 885 644 885 694 882C 740 880 765 873 781 866C 804 857 819 847 836 831C 852 814 863 798 871 776C 878 760 885 735 887 689C 890 639 890 624 890 498C 890 372 890 357 887 307C 885 261 878 236 871 219C 863 197 852 181 836 165C 819 148 804 138 781 129C 765 123 740 115 694 113C 644 111 629 110 503 110C 487 110 473 110 460 110C 460 110 460 110 460 110M 755 189C 786 189 812 214 812 246C 812 277 786 302 755 302C 724 302 698 277 698 246C 698 214 724 189 755 189C 755 189 755 189 755 189M 503 255C 637 255 745 364 745 498C 745 632 637 740 503 740C 369 740 260 632 260 498C 260 364 369 255 503 255C 503 255 503 255 503 255M 345 498C 345 585 416 655 503 655C 590 655 660 585 660 498C 660 411 590 340 503 340C 416 340 345 411 345 498C 345 498 345 498 345 498' />
                            </svg>
                          </Link>
                        </div>
                      )}
                      {props.user.twitterURL && (
                        <div>
                          <Link href={props.user.twitterURL}>
                            <svg
                              className={classes.svg}
                              width='24'
                              height='24'
                              viewBox='0 0 1000 1000'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M 75 0C 75 0 75 0 75 0C 33 0 0 33 0 75C 0 75 0 925 0 925C 0 967 33 1000 75 1000C 75 1000 925 1000 925 1000C 967 1000 1000 967 1000 925C 1000 925 1000 75 1000 75C 1000 33 967 0 925 0C 925 0 75 0 75 0M 75 50C 75 50 925 50 925 50C 939 50 950 61 950 75C 950 75 950 925 950 925C 950 939 939 950 925 950C 925 950 75 950 75 950C 61 950 50 939 50 925C 50 925 50 75 50 75C 50 61 61 50 75 50M 342 828C 252 828 163 802 88 754C 175 764 265 739 333 685C 266 685 203 640 181 577C 188 566 232 579 253 568C 178 554 119 482 121 406C 140 412 170 426 196 424C 124 379 100 276 144 204C 227 306 354 371 485 376C 474 330 484 278 513 240C 564 169 672 152 741 204C 774 247 827 205 865 189C 873 206 830 262 799 277C 829 274 859 266 888 254C 886 271 839 317 811 337C 816 452 777 568 705 658C 619 768 480 830 342 828' />
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {props.user.genres.length !== 0 && (
                  <div className={classes.body}>
                    <h2
                      className={classes.h2}
                      style={{ color: randomColorGenerator() }}
                    >
                      Preferred Genres
                    </h2>
                    {props.user.genres.map((genre) => (
                      <>
                        <Link href={`/genres/${genre}`}>{genre}</Link>
                        <br />
                      </>
                    ))}
                  </div>
                )}
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Excited to See...
                </h2>
                <div className={classes.body}>
                  {(props.user.excited.length === 0 && (
                    <span>No one yet.</span>
                  )) || (
                    <ul className={classes.ul}>
                      {props.user.excited.map((show, idx) => (
                        <li key={idx}>
                          {myPage && (
                            <SmallButton
                              onClick={() => onDeleteExcitedUser(show)}
                            >
                              x
                            </SmallButton>
                          )}
                          <Link href={`/shows/${show}`}>
                            <a className={classes.box}>{show}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
            {/* Only show this card if Friends is enabled */}
            {props.user.friendsEnabled && (
              <Card>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Friends
                </h2>
                {loggedIn &&
                  !myPage &&
                  !props.user.friendOf.includes(session.user.name) && (
                    <Button onClick={onAddFriend}>add friend</Button>
                  )}
                {loggedIn &&
                  !myPage &&
                  props.user.friendOf.includes(session.user.name) && (
                    <Button onClick={onDeleteFriend}>remove friend</Button>
                  )}
                <div className={classes.body}>
                  {props.user.friends.length === 0 && <p>No friends yet.</p>}
                  {props.user.friends.length !== 0 && (
                    <ul className={classes.ul}>
                      {props.user.friends.map((friend, idx) => (
                        <li key={idx}>
                          {myPage && (
                            <SmallButton onClick={() => onDeleteFriend(friend)}>
                              x
                            </SmallButton>
                          )}
                          <Link href={`/users/${friend}`}>{friend}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT-SIDE PANE */}
          <div>
            {props.user.videoURL && (
              <Card>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Video of the Moment
                </h2>
                <p className={classes.videoBox}>
                  <iframe
                    width='100%'
                    height='280px'
                    src={props.user.videoURL.replace('watch?v=', 'embed/')}
                    title='YouTube video player'
                    frameBorder='1'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  ></iframe>
                </p>
              </Card>
            )}
            {/* only show this card if Comments is enabled */}

            <Card>{randomImageGenerator()}</Card>
            {props.user.commentsEnabled && (
              <Card>
                <h2
                  className={classes.h2}
                  style={{ color: randomColorGenerator() }}
                >
                  Comment Wall
                </h2>
                <span className={classes.box}></span>
                {!session && <p>You must log in to leave comments.</p>}
                {session && (
                  <form className={classes.form} onSubmit={onAddCommentHandler}>
                    <div className={classes.control}>
                      <textarea
                        required
                        id='comment'
                        rows='4'
                        ref={commentInputRef}
                      ></textarea>
                    </div>
                    <div className={classes.actions}>
                      <Button>leave comment</Button>
                    </div>
                  </form>
                )}
                {props.user.comments.length !== 0 && (
                  <div className={classes.body}>
                    {props.user.comments.map((comment) => (
                      <>
                        <div className={classes.commentBody}>
                          {comment.body}
                        </div>
                        <div className={classes.commentAuthor}>
                          <Link href={`/users/${comment.author}`}>
                            {comment.author}
                          </Link>
                          <div className={classes.commentTimestamp}>
                            {comment.timestamp}
                            {/* Is active session also author of comment? If so, let them delete it */}
                            {session && session.user.name === comment.author && (
                              <>
                                {' '}
                                <SmallButtonRight
                                  value={comment.id}
                                  onClick={onDeleteCommentHandler}
                                >
                                  x
                                </SmallButtonRight>
                              </>
                            )}
                          </div>
                        </div>
                        <div className={classes.hr}>
                          <hr />
                        </div>
                      </>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  )
}
