import Link from 'next/link'

export default function UserList(props) {
  return (
    <>
      {props.users.map((user) => (
        <p>
          <Link href={'/users/' + user.username}>{user.username}</Link>
        </p>
      ))}
    </>
  )
}
