import * as React from 'react'
import styles from './_styles/PlayMusic.module.scss'

import { Button, Progress, Toast } from 'antd-mobile'
import { adjustTime } from '@/untils/index'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { globalStates } from '@/type/inedx'
import { IGetMusicInfo } from '@/plugins/Mp3/types/info'
import { useHistory } from 'react-router-dom'
import { ICurrMusicInfo } from '@/type/globalReducerState'
import { CHANGE_PLAY_MUSIC_LOVE, CHANGE_LOCAL_MUSIC } from '@/store/actions'

interface IProp {
  GlobalPlayList: GdListI
  currMusicInfo: ICurrMusicInfo
  changePlayMusicLove: (state: boolean) => void
  setLocalMusic: (musicList: any[], musicIds: any[]) => void
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
  const [indexLyric, setIndexLyric] = React.useState<any>(0)  //歌词当前句
  const [precent, setPrecent] = React.useState<any>(0)
  const [currTime, setCurrTime ] = React.useState<number>(0)
  const [lyricTime, setlyricTime ] = React.useState<number>(0)
  const [playList, setPlayList] = React.useState({})
  const [playMode, setPlayMode] = React.useState(window.player.getPlayMode)
  
  React.useEffect(() => {
    setPlayList(props.GlobalPlayList)
  }, [props.GlobalPlayList])

  React.useEffect(() => {
    if (playList[0]) {
      const onUpdata = window.player.on('timeupdate', musicUpdata)

      setPlay(() => {
        return window.player.paused ? false : true
      })

      return () => {
        window.player.remove(onUpdata)
      }
    }
  }, [playList])

  React.useEffect(() => {
    if (indexLyric < props.currMusicInfo.lyric.length - 1 && currTime * 1000 >= props.currMusicInfo.lyric[indexLyric+1][0]) {
      setIndexLyric(indexLyric + 1)
    }
  }, [currTime, indexLyric, props.currMusicInfo.lyric])

  const musicUpdata = (info: IGetMusicInfo) => {
    setPrecent(() => (info.currentTime / info.duration * 100))
    setCurrTime(info.currentTime)
    setlyricTime(info.duration)
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

  const handleAddLocalMusic = (): void => {
    if (props.currMusicInfo.isLove) {
    
      props.changePlayMusicLove(false)

      if (window.localStorage.getItem('localMusics')) {
        let json: any = window.localStorage.getItem('localMusics')
        let jsonId: any = window.localStorage.getItem('localMusicIds')

        json = JSON.parse(json)
        jsonId = JSON.parse(jsonId)

        let index: number = jsonId.indexOf(props.currMusicInfo.detailInfo.id)

        json.splice(index, 1)
        jsonId.splice(index, 1)

        window.localStorage.setItem('localMusics', JSON.stringify(json))
        window.localStorage.setItem('localMusicIds', JSON.stringify(jsonId))

        props.setLocalMusic(json, jsonId)
      }
    } else {

      props.changePlayMusicLove(true)

      if (window.localStorage.getItem('localMusics')) {
        let json: any = window.localStorage.getItem('localMusics')
        let jsonId: any = window.localStorage.getItem('localMusicIds')
  
        json = JSON.parse(json)
        json.push(props.currMusicInfo.detailInfo)
  
        jsonId = JSON.parse(jsonId)
        jsonId.push(props.currMusicInfo.detailInfo.id)
  
        window.localStorage.setItem('localMusics', JSON.stringify(json))
        window.localStorage.setItem('localMusicIds', JSON.stringify(jsonId))
        props.setLocalMusic(json, jsonId)
      } else {
        let json: any = JSON.stringify([props.currMusicInfo.detailInfo])
        let jsonId: any = JSON.stringify([props.currMusicInfo.detailInfo.id])
  
        window.localStorage.setItem('localMusics', json)
        window.localStorage.setItem('localMusicIds', jsonId)
        props.setLocalMusic(json, jsonId)
      }
    }
  }

  const playModeList = ['&#xe67b;', '&#xea43;', '&#xe620;']

  const handleChangePlayMode = () => {
    window.player.setPlayMode()

    let msgList: string[] = [ '顺序', '随机', '单曲']
    let msg = msgList[window.player.getPlayMode] + '播放'

    Toast.success(msg)
    
    setPlayMode(window.player.getPlayMode)
  }

  return(
    <div className={styles._home}>
      <div className={styles._homeMain}>
        <div className={styles.musicHeader}>
          <i className="icon-font ic-gy-color" onClick={() => histry.push('/')}>&#xe716;</i>
        </div>
        <div className={styles._musicTitle}>
          {props.currMusicInfo.detailInfo.name ?
            <span className={styles.scrollText}>{`${props.currMusicInfo.detailInfo.name} - ${props.currMusicInfo.detailInfo.ar[0].name}`}</span>
            : <></>
          }
        </div>
        <div className={styles._musicCoverBox}>
          <div className={styles._musicCover}>
            {props.currMusicInfo.detailInfo.name ?
              <img src={`${props.currMusicInfo.detailInfo.al.picUrl}?param=200y200`} alt="" />
              : <></>
            }
          </div>
        </div>
        <div className={styles._lyricBox}>
          <div className={styles.nowLyric}>
            <span>{props.currMusicInfo.lyric[indexLyric] && props.currMusicInfo.lyric[indexLyric][1]}</span>
          </div>
          <div className={styles.nextLyric}>
            <span>{indexLyric < props.currMusicInfo.lyric.length ? <>{props.currMusicInfo.lyric[indexLyric+1] && props.currMusicInfo.lyric[indexLyric+1][1]}</> : <>'end'</>}</span>
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
          <span className={`${styles.layricTime} c-ml20`}>{adjustTime(lyricTime)}</span>
        </div>
        <div className={styles.btnGroup}>
          <Button className={`${styles._homeBtn} ${styles.prevBtn} c-mr20`} onClick={handleChangePlayMode}>
            <i className={`icon-font x-y-center`} dangerouslySetInnerHTML={{__html: playModeList[playMode]}}></i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn}`} onClick={handlePrevBtn}>
            <i className={`icon-font x-y-center`}>&#xea44;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.playBtn}`}
            onClick={handlePlayBtn}>
            <i className="icon-font x-y-center">{ !play ? <>&#xe6a4;</> : <>&#xe63a;</>}</i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn}`} onClick={handleNextBtn}>
            <i className="icon-font x-y-center">&#xea47;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.prevBtn} c-ml20`} onClick={handleAddLocalMusic}>
            <i className={`icon-font x-y-center`}>
              { props.currMusicInfo.isLove ? <>&#xe79d;</> : <>&#xe62a;</> }
            </i></Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: globalStates): { GlobalPlayList: any, currMusicInfo: any } => ({
  GlobalPlayList: state.globalReducer.playList,
  currMusicInfo: state.globalReducer.currMusicInfo
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePlayMusicLove: (state: boolean) => dispatch(CHANGE_PLAY_MUSIC_LOVE(state)),
  setLocalMusic: (musicList: any[], musicIds: any[]) => dispatch(CHANGE_LOCAL_MUSIC(musicList, musicIds)),
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
