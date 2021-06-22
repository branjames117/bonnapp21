import classes from './Video.module.css'
import Card from '../../components/layout/Card'
import randomColorGenerator from '../../lib/random-colors'

export default function Video(props) {
  return (
    <Card>
      <h2 className={classes.h2} style={{ color: randomColorGenerator() }}>
        Video of the Moment
      </h2>
      <p className={classes.videoBox}>
        <iframe
          allowFullScreen='allowfullscreen'
          width='100%'
          height='450px'
          src={props.videoURL.replace('watch?v=', 'embed/')}
          title='YouTube video player'
          frameBorder='1'
          allow='accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        ></iframe>
      </p>
    </Card>
  )
}