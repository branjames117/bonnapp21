import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import classes from './Comments.module.css'
import Card from '../layout/Card'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

/* TO DO 
  Maybe use useEffect so that the comments card reloads with each comment addition/deletion,
  rather than having to force a page reroute to show the update?

*/

export default function Comments(props) {
  const [session, _] = useSession()
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState()
  const [loading, setLoading] = useState(false)
  const commentInputRef = useRef()

  useEffect(async () => {
    const response = await fetch(`/api/comments/${props._id}`)
    const data = await response.json()
    setComments(data.comments)
    setLoading(false)
  }, [loading])

  /* CREATE COMMENT HANDLER */
  async function addCommentHandler(e) {
    e.preventDefault()
    setCommentError(false)

    const commentData = {
      text: commentInputRef.current.value,
      username: session.user.name,
    }

    if (
      commentData.text.trim() === '' ||
      commentData.text.trim().length > 500
    ) {
      setCommentError(true)
      return
    }

    setLoading(true)
    await fetch(`/api/comments/${props._id}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    return
  }

  /* DELETE COMMENT HANDLER */
  async function deleteCommentHandler(e) {
    e.preventDefault()
    setLoading((prevState) => !prevState)

    const commentData = {
      commentID: e.target.value,
    }

    await fetch(`/api/comments/${props._id}`, {
      method: 'DELETE',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return (
    <Card>
      {loading && <p>Loading comments...</p>}
      {!loading && (
        <>
          <Headline
            className={classes.h2}
            style={{ color: randomColorGenerator() }}
          >
            Comment Wall
          </Headline>
          <span className={classes.box}></span>
          {!session && <p>You must log in to leave comments.</p>}
          {session && (
            <form className={classes.form} onSubmit={addCommentHandler}>
              <div className={classes.control}>
                <textarea
                  id='text'
                  rows='4'
                  ref={commentInputRef}
                  className={commentError ? classes.controlError : null}
                  onChange={() => setCommentError(false)}
                ></textarea>
              </div>
              <div className={classes.actions}>
                <Button>leave comment</Button>
              </div>
            </form>
          )}
          {commentError && (
            <p className={classes.error}>
              Comment cannot be empty and must be less than 500 characters long.
            </p>
          )}
          {comments !== 0 && (
            <div className={classes.comments}>
              {comments.map((comment) => (
                <>
                  <div className={classes.comment}>
                    <p className={classes.commentBody}>{comment.text}</p>
                    <div className={classes.commentAuthor}>
                      <Link href={`/users/${comment.username}`}>
                        {comment.username}
                      </Link>
                      <div className={classes.commentTimestamp}>
                        {new Date(comment.timestamp).toLocaleString()}
                        {/* Is user author of comment? If so, enable delete */}
                        {session && session.user.name === comment.username && (
                          <>
                            {' '}
                            <button
                              className={classes.btn}
                              value={comment._id}
                              onClick={deleteCommentHandler}
                            >
                              {' '}
                              delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  )
}
