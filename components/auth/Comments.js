import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import classes from './Comments.module.css'
import Card from '../layout/Card'
import Headline from '../layout/Headline'
import Button from '../layout/Button'
import randomColorGenerator from '../../lib/random-colors'

export default function Comments(props) {
  const [session, _] = useSession()
  const [comments, setComments] = useState([])
  const [commentError, setCommentError] = useState()
  const [loading, setLoading] = useState(false)
  const commentInputRef = useRef()

  /* every time we go loading state, reload comments from API */
  useEffect(async () => {
    const response = await fetch(`/api/comments/${props._id}`)
    const data = await response.json()
    setComments(data.comments)
    setLoading(false)
  }, [loading])

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
    await fetch(`/api/comments/${props._id}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })

    commentInputRef.current.value = ''
    return
  }

  async function deleteCommentHandler(e) {
    e.preventDefault()
    setLoading((prevState) => !prevState)

    const commentData = {
      commentID: e.target.value,
      username: session.user.name,
    }

    await fetch(`/api/comments/${props._id}`, {
      method: 'DELETE',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
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
        <form onSubmit={addCommentHandler}>
          <div className='control'>
            <textarea
              id='text'
              name='text'
              rows='4'
              ref={commentInputRef}
              className={commentError ? 'controlError' : null}
              onChange={() => setCommentError(false)}
            ></textarea>
          </div>
          {!loading && <Button>leave comment</Button>}
        </form>
      )}
      {commentError && (
        <p className='error'>
          Comment cannot be empty and must be less than 500 characters long.
        </p>
      )}
      {comments !== 0 && (
        <div className={classes.comments}>
          {comments.map((comment) => (
            <span key={comment._id}>
              <div className={classes.comment}>
                <p className={classes.commentBody}>{comment.text}</p>
                <div className={classes.commentAuthor}>
                  <Link href={`/user/${comment.username}`}>
                    {comment.username}
                  </Link>
                  <div className={classes.commentTimestamp}>
                    {new Date(comment.timestamp).toLocaleString()}
                    {/* Is user author of comment or admin? If so, enable delete */}
                    {session &&
                      (session.user.name === comment.username ||
                        session.user.name === 'admin') && (
                        <>
                          <button
                            className={classes.btn}
                            value={comment._id}
                            onClick={deleteCommentHandler}
                          >
                            delete
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}
