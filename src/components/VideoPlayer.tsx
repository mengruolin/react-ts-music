import * as React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'

interface IProps {}

const VideodPlayr: React.SFC<IProps> = (props) => {
  React.useEffect(() => {
    console.log(1);
    
    const videoPlayer = videojs('my-player')
    videoPlayer.play()
  }, [])
  return (
    <div>
      <video
        id="my-player"
        controls
        preload="auto"
        poster="//vjs.zencdn.net/v/oceans.png"
        data-setup='{}'
        >
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
      </video>
    </div>
  )
}

export default VideodPlayr
