import classes from './ShowProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'
import Link from 'next/link'
import { useRef } from 'react'
import { useSession } from 'next-auth/client'
import randomColorGenerator from '../../lib/random-colors'

export default function ShowProfile(props) {
  const [session, _] = useSession()
  const commentInputRef = useRef()

  function onAddCommentHandler(e) {
    e.preventDefault()

    const enteredBody = commentInputRef.current.value
    const commentAuthor = session.user.name
    const targetedShow = props.show.title

    const commentData = {
      body: enteredBody,
      author: commentAuthor,
      show: targetedShow,
    }

    commentInputRef.current.value = ''

    props.onAddComment(commentData)
  }

  function onDeleteCommentHandler(e) {
    e.preventDefault()

    const commentData = {
      commentID: e.target.value,
      show: props.show.title,
    }

    props.onDeleteComment(commentData)
  }

  function onAddExcitedUser() {
    const excitedData = {
      user: session.user.name,
      show: props.show.title,
    }

    props.onAddExcitedUser(excitedData)
  }

  function onDeleteExcitedUser() {
    const excitedData = {
      user: session.user.name,
      show: props.show.title,
    }

    props.onDeleteExcitedUser(excitedData)
  }

  return (
    <div className={classes.grid}>
      <div>
        <Card>
          <h1 className={classes.h1} style={{ color: randomColorGenerator() }}>
            {props.show.title}
          </h1>
          {props.show.site && (
            <p>
              <Link href={props.show.site}>Visit Their Official Site</Link>
            </p>
          )}
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            About the Show
          </h2>
          <p>
            {props.show.bio} <Link href={props.show.wiki}> (Source)</Link>
          </p>
          <div className={classes.body}>
            <h2
              className={classes.h2}
              style={{ color: randomColorGenerator() }}
            >
              Genres
            </h2>
            {props.show.genres.map((genre) => (
              <>
                <Link href={`/genres/${genre}`}>{genre}</Link>
                <br />
              </>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            Who's Excited?
          </h2>
          {session && !props.show.excitedUsers.includes(session.user.name) && (
            <Button onClick={onAddExcitedUser}>I'm Excited!</Button>
          )}
          {session && props.show.excitedUsers.includes(session.user.name) && (
            <Button onClick={onDeleteExcitedUser}>Actually, I'll Pass!</Button>
          )}
          {!session && <p>Log in to add your name to the list!</p>}
          <div className={classes.body}>
            {props.show.excitedUsers.length === 0 && (
              <span className={classes.box}>No one yet.</span>
            )}
            <ul className={classes.ul}>
              {props.show.excitedUsers.map((user, idx) => (
                <li key={idx}>
                  <Link href={`/users/${user}`}>
                    <a className={classes.box}>{user}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      <div className={classes.gridMid}>
        <Card>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
            Check Out Their Music
          </h2>
          {props.show.videos.map((video) => (
            <p className={classes.videoBox}>
              <iframe
                width='100%'
                height='450px'
                src={video.replace('watch?v=', 'embed/')}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              ></iframe>
            </p>
          ))}
        </Card>
        <Card>
          <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
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
          {props.show.comments.length !== 0 && (
            <div className={classes.body}>
              {props.show.comments.map((comment) => (
                <>
                  <div className={classes.commentBody}>{comment.body}</div>
                  <div className={classes.commentAuthor}>
                    <Link href={`/users/${comment.author}`}>
                      {comment.author}
                    </Link>
                    <div className={classes.commentTimestamp}>
                      {comment.timestamp}
                      {/* Is active session also author of comment? If so, let them delete it */}
                      {session && session.user.name === comment.author && (
                        <>
                          &middot;{' '}
                          <button
                            value={comment.id}
                            onClick={onDeleteCommentHandler}
                          >
                            delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
