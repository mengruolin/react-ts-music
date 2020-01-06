import * as React from 'react';
import './_styles/index.scss'
import OilLoading from '../../../components/loading/OilLoading'

import { getPlaylistDetail, getLyric } from '../../../api/request';
import { Button, Progress } from 'antd-mobile';
import { parseLyric } from '../../../untils/index'

export interface Props {
}

const Home: React.SFC = () => {
  const [init] = React.useState<boolean>(true)
  const [play, setPlay] = React.useState(false)
  const [musicInfo, setMusicInfo] = React.useState<any>({})
  const [autor, setAutor] = React.useState<any>({})
  const [album, setAlbum] = React.useState<any>({})
  const [loading, setLoading] = React.useState<boolean>(true)
  const [lyric, setLyric] = React.useState<any>()
  const [indexLyric, setIndexLyric] = React.useState<any>(0)
  const [lyricLn, setLyricLn] = React.useState<Number>(0)
  const [precent, setPrecent] = React.useState<any>(0)
  

  React.useEffect(() => {
    initPlayer()
  }, [init])

  const initPlayer = async () => {
    const gdList: any = await getPlaylistDetail({id: '524176061'})
    const trackIds: any = gdList.playlist.trackIds
    const tracks: any = gdList.playlist.tracks
    

    setTimeout(() => {
      let lyric: any
      let count = 0
      let ln = 0

      ;(window as any).player.init({}, trackIds)
      setLoading(false)

      ;(window as any).player.on('readly', (async (i: any) => {
        setMusicInfo(tracks[i])
        setAutor(tracks[i].ar[0])
        setAlbum(tracks[i].al)
        
        const res = await getLyric({id: tracks[i].id})
        
        if (!res.lrc) {
          setIndexLyric(0)
          setLyric(() => [[0, "暂无歌词！！！"]])
        } else {
          lyric = parseLyric(res.lrc.lyric)
          ln = lyric.length

          setLyric(lyric)
          setIndexLyric(0)
        }

        count = 0
        setLyricLn(ln)
      }))

      ;(window as any).player.on('timeupdate', ((musicInfo: any) => {
        
        setPrecent(() => {
          return musicInfo.currentTime / musicInfo.duration * 100
        })

        if (count < ln - 1 && lyric && musicInfo.currentTime * 1000 >= lyric[count+1][0]) {
          count++
          setIndexLyric(count)
        }
      }))

    }, 0)
  }

  const handlePlayBtn = (): void => {
    !play ? (window as any).player.play() : (window as any).player.pause()
    setPlay(!play)
  }

  const handleNextBtn = (): void => {
    ;(window as any).player.nextMusic()
    setIndexLyric(0)
    setPlay(true)
    setPrecent(0)
  }

  const handlePrevBtn = (): void => {
    ;(window as any).player.prevMusic()
    setPlay(true)
    setIndexLyric(0)
    setPrecent(0)
  }
  
  return(
    <div className="_home">
      <OilLoading show={loading}/>
      <div className="_home-main">
        <div className="music-header">
          <i className="icon-font">&#xe634;</i>
        </div>
        <div className="_music-title">
          <span className="scroll-text">{`${musicInfo.name} - ${autor.name}`}</span>
        </div>
        <div className="_music-cover-box">
          <div className="_music-cover">
            <img src={`${album.picUrl}?param=200y200`} alt="" />
          </div>
        </div>
        <div className="_lyric-box">
          <div className="now-lyric">
            <span>{lyric && lyric[indexLyric] && lyric[indexLyric][1]}</span>
          </div>
          <div className="next-lyric">
            <span>{indexLyric < lyricLn ? <>{lyric && lyric[indexLyric+1] && lyric[indexLyric+1][1]}</> : <>'end'</>}</span>
          </div>
        </div>
      </div>
      <div className="_handle-box">
        <div className="pro-group">
          <Progress className="progress-box"
            percent={precent} 
            position="normal"
            barStyle={style.progressStyle}
            style={style.progressBoxStyle} />
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
    </div>
  )
}

export default Home

const style = {
  progressBoxStyle: {
    background: '#BDBDBD',
    borderRadius: '2px',
    overFlow: 'hidden'
  },
  progressStyle: {
    borderColor: '#C92323'
  }
}
