import classes from './ShowProfile.module.css'

export default function ShowProfile(props) {
  return (
    <>
      <h1 className={classes.h1}>{props.title}</h1>
      <div className={classes.container}>
        <div>
          <h2 className={classes.boxLabel}>Genres</h2>
          {props.genres.map((genre) => (
            <span className={classes.genreBox}>{genre}</span>
          ))}
          <h2 className={classes.boxLabel}>Bio</h2>
          <span className={classes.box}>{props.bio}</span>
          <h2 className={classes.boxLabel}>Videos</h2>
          {props.videos.map((video) => (
            <p className={classes.videoBox}>
              <iframe
                width='560'
                height='315'
                src={video.replace('watch?v=', 'embed/')}
                title='YouTube video player'
                frameborder='1'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </p>
          ))}
        </div>
        <div>
          <h2 className={classes.boxLabel}>Interested</h2>
          <span className={classes.box}>{props.interestedUsers}</span>
          <h2 className={classes.boxLabel}>Not Interested</h2>
          <span className={classes.box}>{props.notInterestedUsers}</span>
          <h2 className={classes.boxLabel}>Comments</h2>
          <span className={classes.box}>{props.comments}</span>
        </div>
      </div>
    </>
  )
}
