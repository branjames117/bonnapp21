export default function UserProfile(props) {
  return (
    <>
      <p>{props.userID}</p>
      <p>{props.username}</p>
      <p>{props.password}</p>
      <p>{props.profile}</p>
    </>
  )
}
