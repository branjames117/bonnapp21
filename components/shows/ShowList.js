import Link from 'next/link'

export default function ShowList(props) {
  return (
    <>
      {props.shows.map((show) => (
        <p>
          <Link href={'/shows/' + show.title}>{show.title}</Link>
        </p>
      ))}
    </>
  )
}
