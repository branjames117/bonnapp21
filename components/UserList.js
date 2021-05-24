export default function UserList(props) {
  return (
    <>
      <ul>
        {props.users.map((user) => (
          <li>
            {user.username}: {user.profile}
          </li>
        ))}
      </ul>
    </>
  )
}
