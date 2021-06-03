import classes from './ShowProfile.module.css'
import Card from '../layout/Card'
import Button from '../layout/Button'

export default function ShowProfile(props) {
  return (
    <div className={classes.container}>
      <div>
        <Card color='rgb(59, 131, 224)'>
          <h1 className={classes.h1}>{props.title}</h1>
          <Button>I'm Excited!</Button>
          <Button>I'm Curious</Button>
          <h2 className={classes.h2}>Genres</h2>
          {props.genres.map((genre) => (
            <span className={classes.genreBox}>{genre}</span>
          ))}
          <h2 className={classes.h2}>Bio</h2>
          <span className={classes.box}>
            {props.bio} - <a href={props.wiki}>Wikipedia</a>
          </span>
        </Card>
        <Card color='rgb(215, 88, 231)'>
          <h2 className={classes.h2}>Who's Excited</h2>
          <span className={classes.box}>{props.excitedUsers}</span>
          <span>branjames117</span>
          <h2 className={classes.h2}>Comments</h2>
          <span className={classes.box}>{props.comments}</span>
          <form className={classes.form} onSubmit={null}>
            <div className={classes.control}>
              <textarea required id='comment' rows='3'></textarea>
            </div>
            <div className={classes.actions}>
              <Button>Leave Comment</Button>
            </div>
          </form>
          <div className={classes.comment}>
            <div className={classes.commentBody}>
              "I'm totally jazzed about this band!"
            </div>
            <div className={classes.commentAuthor}>branjames117</div>
          </div>
        </Card>
      </div>
      <div>
        <Card color='rgb(255, 155, 41)'>
          <h2 className={classes.h2}>Videos</h2>
          {props.videos.map((video) => (
            <p className={classes.videoBox}>
              <iframe
                width='100%'
                src={video.replace('watch?v=', 'embed/')}
                title='YouTube video player'
                frameBorder='1'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              ></iframe>
            </p>
          ))}
        </Card>
      </div>
    </div>
  )
}
