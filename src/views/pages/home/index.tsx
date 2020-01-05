import * as React from 'react';
import './_styles/index.scss'
import OilLoading from '../../../components/loading/OilLoading'

import { getPlaylistDetail } from '../../../api/request';
import { Button } from 'antd-mobile';

export interface Props {
}

const Home: React.SFC = () => {
  const [init] = React.useState<boolean>(true)
  const [play, setPlay] = React.useState(false)
  const [musicInfo, setMusicInfo] = React.useState<any>({})
  const [autor, setAutor] = React.useState<any>({})
  const [album, setAlbum] = React.useState<any>({})
  const [loading, setLoading] = React.useState<boolean>(true)
  

  React.useEffect(() => {
    initPlayer()
  }, [init])

  const initPlayer = async () => {
    const gdList: any = await getPlaylistDetail({id: '524176061'})
    const trackIds: any = gdList.playlist.trackIds
    const tracks: any = gdList.playlist.tracks

    setTimeout(() => {
      ;(window as any).player.replaceMusicList(trackIds)

      setLoading(false)

      ;(window as any).player.onIndex((i: any) => {
        setMusicInfo(tracks[i])
        setAutor(tracks[i].ar[0])
        setAlbum(tracks[i].al)
        
      })

    }, 0)
  }

  const handlePlayBtn = (): void => {
    !play ? (window as any).player.play() : (window as any).player.pause()
    setPlay(!play)
  }

  const handleNextBtn = (): void => {
    ;(window as any).player.nextMusic()
    setPlay(true)
  }

  const handlePrevBtn = (): void => {
    ;(window as any).player.prevMusic()
    setPlay(true)
  }
  
  return(
    <div className="_home">
      <OilLoading show={loading}/>
      <div className="_main">
        <div className="_music-title">
          <span className="scroll-text">{`${musicInfo.name} - ${autor.name}`}</span>
        </div>
        <div className="_music-cover">
          <img src={`${album.picUrl}?param=200y200`} alt="" />
        </div>
      </div>
      <div className="btn-group">
        <Button className="_home-btn prev-btn" onClick={handlePrevBtn}>
          <i className="icon-font x-y-center">&#xea44;</i></Button>
        <Button className="_home-btn play-btn"
          onClick={handlePlayBtn}>
          <i className="icon-font x-y-center">{ !play ? <>&#xe6a4;</> : <>&#xe63a;</>}</i></Button>
        <Button className="_home-btn next-btn" onClick={handleNextBtn}>
          <i className="icon-font x-y-center">&#xea47;</i></Button>
      </div>
    </div>
  )
}

export default Home
