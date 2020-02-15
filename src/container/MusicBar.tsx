import * as React from 'react'
import { connect } from 'react-redux'

import styles from './_styles/MusicBar.module.scss'
import { globalStates } from '@/type/inedx'
import { MusicInfoI } from './PlayMusic'
import { IGetMusicInfo } from '@/plugins/Mp3/types/info'
import { parseLyric, adjustTime } from '@/untils/index'
import { getLyric } from '@/api/request'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd-mobile'

interface IProps {
  GlobalPlayList: any
}

const MusicBar: React.SFC<IProps> = (props) => {

  const history = useHistory()

  const [musicInfo, setMusicInfo] = React.useState<MusicInfoI>({
    name: '',
    id: '',
    ar: [{}],
    al: {},
  })

  // play 按钮状态
  const [play, setPlay] = React.useState(false)
  const [lyric, setLyric] = React.useState<[number, string][]>([[0, '暂无歌词！']]) // 歌词组
  const [indexLyric, setIndexLyric] = React.useState<any>(0)  //歌词当前句
  const [currTime, setCurrTime ] = React.useState<number>(0)
  const [lyricTime, setlyricTime ] = React.useState<string>('00:00')
  
  const [playList, setPlayList] = React.useState({})

  React.useEffect(() => {
    props.GlobalPlayList.playlist && setPlayList(props.GlobalPlayList.playlist.tracks)
  }, [props.GlobalPlayList])

  React.useEffect(() => {
    if (playList[0]) {
      const onReadly = window.player.on('readly', musicReady)
      const onUpdata = window.player.on('timeupdate', musicUpdata)

      return () => {
        window.player.remove(onReadly)
        window.player.remove(onUpdata)
      }
    }
  }, [playList])

  React.useEffect(() => {
    if (indexLyric < lyric.length - 1 && currTime * 1000 >= lyric[indexLyric+1][0]) {
      setIndexLyric(indexLyric + 1)
    }
  }, [currTime, indexLyric, lyric])

  const musicReady = async (info: IGetMusicInfo) => {
    setMusicInfo(playList[info.index])
    setlyricTime(() => adjustTime(info.duration))
    setIndexLyric(0)
    
    const res = await getLyric({id: playList[info.index].id})
    
    res.lrc && setLyric(() => parseLyric(res.lrc.lyric))
  }

  const musicUpdata = (info: IGetMusicInfo) => {
    setCurrTime(info.currentTime)
    setPlay(() => {
      return window.player.paused ? false : true
    })
  }

  const handlePlayBtn = (): void => {
    !play ? (window as any).player.play() : (window as any).player.pause()
    setPlay(!play)
  }

  return (
    <div className={styles._musicBar}>
      <div className={styles.playerCover}>
        <img src={`${musicInfo.al.picUrl}?param=80y80`} alt="" className={play? `${styles.coverRotate}` : ''} />
      </div>
      <div className={styles.lyricBox} onClick={() => history.push('/player', {musicInfo, lyric, lyricTime})}>
        <span>{lyric[indexLyric][1]}</span>
      </div>
      <div className={styles.btnGroup}>
        <Button className={`${styles.allBtn} ${styles.playBtn}`} onClick={handlePlayBtn}>
          <i className="icon-font">{ !play ? <>&#xe7ab;</> : <>&#xe663;</>}</i></Button>
        <Button className={`${styles.allBtn} c-ml20`} onClick={handlePlayBtn}>
          <i className="icon-font">&#xe6bf;</i></Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: globalStates): { GlobalPlayList: any } => ({
  GlobalPlayList: state.globalReducer.playList
})

export default connect(mapStateToProps)(MusicBar)
