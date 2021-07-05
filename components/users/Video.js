import classes from './Video.module.css'
import Card from '../../components/layout/Card'
import Headline from '../layout/Headline'

export default function Video(props) {
  return (
    <Card>
      <Headline>Listen to This</Headline>
      <p className={classes.videoContainer}>
        <iframe
          className={classes.iframe}
          allowFullScreen='allowfullscreen'
          width='100%'
          src={props.videoURL.replace('watch?v=', 'embed/')}
          title='YouTube video player'
          frameBorder='1'
          allow='accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        ></iframe>
      </p>
    </Card>
  )
}
