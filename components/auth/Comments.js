import { useEffect, useState, useRef, useContext } from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { ThemeContext } from '../layout/ThemeContext'
import classes from './Comments.module.css'
import Card from '../layout/Card'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import Spinner from '../layout/Spinner'
import randomColorGenerator from '../../lib/random-colors'

export default function Comments(props) {
  const { darkTheme } = useContext(ThemeContext)
  const [session, _] = useSession()
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState()
  const [loading, setLoading] = useState(false)
  const [replyMode, setReplyMode] = useState({
    on: false,
    replyToAuthor: '',
    replyToId: '',
  })
  const commentInputRef = useRef()
  const replyInputRef = useRef()

  /* every time we go loading state, reload comments from API */
  useEffect(async () => {
    setLoading(true)

    const response = await fetch(`/api/comments/${props._id}`)

    const data = await response.json()
    setComments(data.comments)
    setLoading(false)
  }, [props])

  async function addCommentHandler(e) {
    e.preventDefault()
    setCommentError(false)

    const commentData = {
      text: commentInputRef.current.value,
      username: session.user.name,
    }

    /* client-side validation */
    if (
      commentData.text.trim() === '' ||
      commentData.text.trim().length > 500
    ) {
      setCommentError(true)
      return
    }

    setLoading(true)
    const response = await fetch(`/api/comments/${props._id}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    commentInputRef.current.value = ''
    setComments(data.comments)
    setLoading(false)
    return
  }

  async function deleteCommentHandler(e) {
    setLoading(true)
    e.preventDefault()

    const commentData = {
      commentID: e.target.value,
      replyID: null,
      username: session.user.name,
      deletingReply: false,
    }

    const response = await fetch(`/api/comments/${props._id}`, {
      method: 'DELETE',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    setComments(data.comments)
    setLoading(false)
    return
  }

  async function replyCommentHandler(e) {
    e.preventDefault()
    setCommentError(false)

    const replyData = {
      commentID: replyMode.replyToId,
      username: session.user.name,
      text: replyInputRef.current.value,
    }

    /* client-side validation */
    if (replyData.text.trim() === '' || replyData.text.trim().length > 500) {
      setCommentError(true)
      return
    }

    setLoading(true)

    const response = await fetch(`/api/comments/${props._id}`, {
      method: 'PATCH',
      body: JSON.stringify(replyData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    setComments(data.comments)
    setReplyMode({ on: false, replyToAuthor: '', replyToId: '' })
    setLoading(false)
    return
  }

  async function deleteReplyHandler(e) {
    setLoading(true)
    e.preventDefault()
    console.log(e.target.value)

    const replyData = {
      commentID: e.target.value,
      replyID: e.target.name,
      username: session.user.name,
      deletingReply: true,
    }

    const response = await fetch(`/api/comments/${props._id}`, {
      method: 'DELETE',
      body: JSON.stringify(replyData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()

    setComments(data.comments)
    setLoading(false)
    return
  }

  return (
    <Card>
      <Headline style={{ color: randomColorGenerator() }}>
        Comment Wall
      </Headline>
      {!session && (
        <p>
          <Link href='/login'>Log in</Link> to leave comments!
        </p>
      )}
      {session && (
        <>
          {replyMode.on && (
            <form onSubmit={replyCommentHandler}>
              <div className='control'>
                <textarea
                  id='text'
                  name='text'
                  rows='4'
                  ref={replyInputRef}
                  className={commentError && !darkTheme ? 'controlError' : null}
                  onChange={() => setCommentError(false)}
                ></textarea>
              </div>
              {!loading && <Button>reply to {replyMode.replyToAuthor}</Button>}
              {loading && <Spinner />}
            </form>
          )}
          {!replyMode.on && (
            <form onSubmit={addCommentHandler}>
              <div className='control'>
                <textarea
                  id='text'
                  name='text'
                  rows='4'
                  ref={commentInputRef}
                  className={commentError && !darkTheme ? 'controlError' : null}
                  onChange={() => setCommentError(false)}
                ></textarea>
              </div>
              {!loading && <Button>leave comment</Button>}
              {loading && <Spinner />}
            </form>
          )}
        </>
      )}
      {commentError && (
        <p className='error'>
          {replyMode.on ? <span>Reply</span> : <span>Comment</span>}{' '}
          <span>
            cannot be empty and must be less than 500 characters long.
          </span>
        </p>
      )}
      {comments !== 0 && (
        <div className={classes.comments}>
          {comments.map((comment) => (
            <span key={comment._id}>
              <div
                className={darkTheme ? classes.darkComment : classes.comment}
              >
                <p className={classes.commentBody}>{comment.text}</p>
                <div className={classes.commentAuthor}>
                  <Link href={`/user/${comment.username}`}>
                    {comment.username}
                  </Link>
                  <div className={classes.commentTimestamp}>
                    {new Date(comment.timestamp).toLocaleString()}
                    {/* Is user author of comment or admin? If so, enable delete */}
                    <div>
                      {session &&
                        (session.user.name === comment.username ||
                          session.user.name === 'admin') && (
                          <>
                            <button
                              className={
                                darkTheme ? classes.darkBtn : classes.btn
                              }
                              value={comment._id}
                              onClick={deleteCommentHandler}
                            >
                              delete
                            </button>
                          </>
                        )}
                      {session && (
                        <>
                          {!replyMode.on && (
                            <button
                              className={
                                darkTheme ? classes.darkBtn : classes.btn
                              }
                              value={comment._id}
                              onClick={() =>
                                setReplyMode({
                                  on: true,
                                  replyToAuthor: comment.username,
                                  replyToId: comment._id,
                                })
                              }
                            >
                              reply
                            </button>
                          )}
                          {replyMode.on && (
                            <button
                              className={
                                darkTheme ? classes.darkBtn : classes.btn
                              }
                              value={comment._id}
                              onClick={() =>
                                setReplyMode({
                                  on: false,
                                  replyToAuthor: '',
                                  replyToId: '',
                                })
                              }
                            >
                              cancel
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div className={classes.replies}>
                  {comment.replies.map((reply) => (
                    <span key={reply.timestamp}>
                      <div
                        className={
                          darkTheme ? classes.darkReply : classes.reply
                        }
                      >
                        <p className={classes.commentBody}>{reply.text}</p>
                        <div className={classes.commentAuthor}>
                          <Link href={`/user/${reply.username}`}>
                            {reply.username}
                          </Link>
                          <div className={classes.commentTimestamp}>
                            {new Date(reply.timestamp).toLocaleString()}
                            {/* Is user author of comment or admin? If so, enable delete */}
                            <div>
                              {session &&
                                (session.user.name === reply.username ||
                                  session.user.name === 'admin') && (
                                  <>
                                    <button
                                      className={
                                        darkTheme
                                          ? classes.darkBtn
                                          : classes.btn
                                      }
                                      name={reply.id}
                                      value={comment._id}
                                      onClick={deleteReplyHandler}
                                    >
                                      delete
                                    </button>
                                  </>
                                )}
                              {session && (
                                <>
                                  {!replyMode.on && (
                                    <button
                                      className={
                                        darkTheme
                                          ? classes.darkBtn
                                          : classes.btn
                                      }
                                      value={comment._id}
                                      onClick={() => {
                                        setReplyMode({
                                          on: true,
                                          replyToAuthor: comment.username,
                                          replyToId: comment._id,
                                        })
                                      }}
                                    >
                                      reply
                                    </button>
                                  )}
                                  {replyMode.on && (
                                    <button
                                      className={
                                        darkTheme
                                          ? classes.darkBtn
                                          : classes.btn
                                      }
                                      value={comment._id}
                                      onClick={() => {
                                        setReplyMode({
                                          on: false,
                                          replyToAuthor: '',
                                          replyToId: '',
                                        })
                                      }}
                                    >
                                      cancel
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  ))}
                </div>
              )}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}
