import * as React from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'videojs-landscape-fullscreen'
import 'video.js/dist/video-js.min.css'
// City
//import '@videojs/themes/dist/city/index.css'

// Fantasy
import '@videojs/themes/dist/fantasy/index.css'

// Forest
//import '@videojs/themes/dist/forest/index.css'

// Sea
//import '@videojs/themes/dist/sea/index.css'
declare var window: any

interface IProps {
  videoJsOptions: VideoJsPlayerOptions
  cover: string
}
let videoPlayer: VideoJsPlayer | any = null
const VideodPlayr: React.SFC<IProps> = (props) => {

  const { videoJsOptions, cover } = props
  
  React.useEffect(() => {
    window.HELP_IMPROVE_VIDEOJS = false
    window.player.pause()
    videoPlayer = videojs('my-player', videoJsOptions)
    videoPlayer.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true
      }
    })
    return () => {
      videoPlayer.dispose()
    }
  }, [videoJsOptions])
  return (
    <>
      <video
        style={{width: '100%', height: '100%'}}
        id="my-player"
        controls
        className="video-js vjs-theme-fantasy"
        preload="auto"
        poster={cover}
        >
          {
            props.children
          }
          {/* <source src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2612871188/d7c4bc66a24f398466fbc9d0c7c6eb08.mp4?wsSecret=019a156cffc7754acd983ad8f08dbb6c&wsTime=1590243048" type="video/mp4"></source> */}
      </video>
    </>
  )
}

export default VideodPlayr
