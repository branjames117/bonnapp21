export default function ShowProfile(props) {
  return (
    <div className={classes.container}>
      <p>{props.title}</p>
      <p>Genres: {props.genres}</p>
      <p>Bio: {props.bio}</p>
      <p>Videos: {props.videos}</p>
      <p>Interested: {props.interestedUsers}</p>
      <p>Not Interested: {props.notInterestedUsers}</p>
      <p>Comments: {props.comments}</p>
    </div>
  )
}
