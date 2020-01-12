import * as React from 'react'

import styles from './_styles/PlayMusic.module.scss'

import { getLyric } from '@/api/request'
import { Button, Progress } from 'antd-mobile'
import { parseLyric, adjustTime } from '@/untils/index'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setLoading } from '@/store/actions'
import { IStates } from '@/type/inedx'
import { IGetMusicInfo } from '@/plugins/Mp3/types/info'
import { useHistory, useLocation } from 'react-router-dom'

interface IProp {
  GlobalPlayList: GdListI
}
export interface MusicInfoI {
  name: string
  id: number | string
  ar: {name?: string}[]
  al: {picUrl?: string}
}

interface GdListI {
  playlist: playlistI
}

interface playlistI {
  trackIds: string
  tracks: MusicInfoI[]
}


const Home: React.SFC<IProp> = (props: IProp) => {
  const histry = useHistory()
  // play 按钮状态
  const [play, setPlay] = React.useState(false)
  const location = useLocation()
  //歌曲基础信息
  const [musicInfo, setMusicInfo] = React.useState<MusicInfoI>({
    name: '',
    id: '',
    ar: [{}],
    al: {},
  })
  const [lyric, setLyric] = React.useState<[number, string][]>([[0, '暂无歌词！']]) // 歌词组
  const [indexLyric, setIndexLyric] = React.useState<any>(0)  //歌词当前句
  const [precent, setPrecent] = React.useState<any>(0)
  const [currTime, setCurrTime ] = React.useState<number>(0)
  const [lyricTime, setlyricTime ] = React.useState<string>('00:00')
  const [playList, setPlayList] = React.useState({})

  React.useEffect(() => {
    setMusicInfo(() => location.state.musicInfo)
    setLyric(() => location.state.lyric)
    setlyricTime(() => location.state.lyricTime)
    // setIndexLyric(0)
  }, [location.state])
  
  React.useEffect(() => {
    props.GlobalPlayList.playlist && setPlayList(props.GlobalPlayList.playlist.tracks)
  }, [props.GlobalPlayList])

  React.useEffect(() => {
    if (playList[0]) {
      // const onReadly = window.player.on('readly', musicReady)
      const onUpdata = window.player.on('timeupdate', musicUpdata)

      setPlay(() => {
        return window.player.paused ? false : true
      })

      return () => {
        // window.player.remove(onReadly)
        window.player.remove(onUpdata)
      }
    }
  }, [playList])

  React.useEffect(() => {
    if (indexLyric < lyric.length - 1 && currTime * 1000 >= lyric[indexLyric+1][0]) {
      setIndexLyric(indexLyric + 1)
    }
  }, [currTime, indexLyric, lyric])

  // const musicReady = async (info: IGetMusicInfo) => {
  //   console.log(playList[info.index]);
    
  //   setMusicInfo(playList[info.index])
  //   setlyricTime(() => adjustTime(info.duration))
  //   setIndexLyric(0)
    
  //   const res = await getLyric({id: playList[info.index].id})
    
  //   res.lrc && setLyric(() => parseLyric(res.lrc.lyric))
  // }

  const musicUpdata = (info: IGetMusicInfo) => {
    setPrecent(() => (info.currentTime / info.duration * 100))
    setCurrTime(info.currentTime)
  }

  const handlePlayBtn = (): void => {
    !play ? window.player.play() : window.player.pause()
    setPlay(!play)
  }

  const handleNextBtn = (): void => {
    window.player.nextMusic()
    setIndexLyric(0)
    setPlay(true)
    setPrecent(0)
  }

  const handlePrevBtn = (): void => {
    window.player.prevMusic()
    setPlay(true)
    setIndexLyric(0)
    setPrecent(0)
  }
  
  return(
    <div className={styles._home}>
      <div className={styles._homeMain}>
        <div className={styles.musicHeader}>
          <i className="icon-font ic-gy-color" onClick={() => histry.push('/')}>&#xe716;</i>
        </div>
        <div className={styles._musicTitle}>
          <span className={styles.scrollText}>{`${musicInfo.name} - ${musicInfo.ar[0].name}`}</span>
        </div>
        <div className={styles._musicCoverBox}>
          <div className={styles._musicCover}>
            <img src={`${musicInfo.al.picUrl}?param=200y200`} alt="" />
          </div>
        </div>
        <div className={styles._lyricBox}>
          <div className={styles.nowLyric}>
            <span>{lyric[indexLyric] && lyric[indexLyric][1]}</span>
          </div>
          <div className={styles.nextLyric}>
            <span>{indexLyric < lyric.length ? <>{lyric[indexLyric+1] && lyric[indexLyric+1][1]}</> : <>'end'</>}</span>
          </div>
        </div>
      </div>
      <div className={styles._handleBox}>
        <div className={styles.proGroup}>
          <span className={`${styles.layricTime} c-mr20`}>{adjustTime(currTime)}</span>
          <Progress className={styles.progressBox}
            percent={precent} 
            position="normal"
            barStyle={barStyle.progressStyle}
            style={barStyle.progressBoxStyle} />
          <span className={`${styles.layricTime} c-ml20`}>{lyricTime}</span>
        </div>
        <div className={styles.btnGroup}>
          <Button className={`${styles._homeBtn} ${styles.prevBtn} c-mr20`} onClick={handlePrevBtn}>
            <i className={`icon-font x-y-center`}>&#xea43;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn}`} onClick={handlePrevBtn}>
            <i className={`icon-font x-y-center`}>&#xea44;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.playBtn}`}
            onClick={handlePlayBtn}>
            <i className="icon-font x-y-center">{ !play ? <>&#xe6a4;</> : <>&#xe63a;</>}</i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn}`} onClick={handleNextBtn}>
            <i className="icon-font x-y-center">&#xea47;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn} c-ml20`} onClick={handlePrevBtn}>
            <i className={`icon-font x-y-center`}>&#xe62a;</i></Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStates): { GlobalPlayList: any } => ({
  GlobalPlayList: state.playList
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetLoading: (scope: string, value: boolean) => dispatch(setLoading(scope, value))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)

const barStyle = {
  progressBoxStyle: {
    background: '#BDBDBD',
    borderRadius: '2px',
    overFlow: 'hidden',
  },
  progressStyle: {
    borderColor: '#C92323'
  }
}
