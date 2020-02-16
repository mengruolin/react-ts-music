import * as React from 'react'
import { connect } from 'react-redux'

import styles from './_styles/MusicBar.module.scss'
import { globalStates } from '@/type/inedx'
import { IGetMusicInfo } from '@/plugins/Mp3/types/info'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { ICurrMusicInfo } from '@/type/globalReducerState'
import { changeMusicInfoAction } from '@/store/actions'

interface IProps {
  globalPlayList: any
  currMusicInfo: ICurrMusicInfo
  changeCurrMusic: (currMusic: any) => void
}

const MusicBar: React.SFC<IProps> = (props) => {
  const history = useHistory()

  // play 按钮状态
  const [play, setPlay] = React.useState(false)
  const [indexLyric, setIndexLyric] = React.useState<any>(0)  //歌词当前句
  const [currTime, setCurrTime ] = React.useState<number>(0)
  const [playList, setPlayList] = React.useState({})

  React.useEffect(() => {
   setPlayList(props.globalPlayList)
  }, [props.globalPlayList])

  React.useEffect(() => {
    if (playList[0]) {
      const onReadly = window.player.on('readly', musicReady)
      const onUpdata = window.player.on('timeupdate', musicUpdata)

      return () => {
        window.player.remove(onReadly)
        window.player.remove(onUpdata)
      }
    }
  }, [playList, props.currMusicInfo.detailInfo.id])

  React.useEffect(() => {
    if (indexLyric < props.currMusicInfo.lyric.length - 1 && currTime * 1000 >= props.currMusicInfo.lyric[indexLyric+1][0]) {
      setIndexLyric(indexLyric + 1)
    }
  }, [currTime, indexLyric, props.currMusicInfo.lyric])

  const musicReady = async (info: IGetMusicInfo) => {
    setIndexLyric(0)
    console.log(playList);
    
    props.changeCurrMusic(playList[info.index])
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
        {props.currMusicInfo.detailInfo.name ?
          <img src={`${props.currMusicInfo.detailInfo.al.picUrl}?param=80y80`} alt="" className={play? `${styles.coverRotate}` : ''} />
          : <></>
        }
      </div>
      <div className={styles.lyricBox} onClick={() => history.push('/player')}>
        <span>{props.currMusicInfo.lyric[indexLyric][1]}</span>
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

const mapStateToProps = (state: globalStates): { globalPlayList: any, currMusicInfo: any } => ({
  globalPlayList: state.globalReducer.playList,
  currMusicInfo: state.globalReducer.currMusicInfo
})

const mapDispatchToProps = (dispatch: any) => ({
  changeCurrMusic : (currMusic: any) => dispatch(changeMusicInfoAction(currMusic))
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicBar)
