import * as React from 'react'
import { connect } from 'react-redux'

import styles from './_styles/MusicBar.module.scss'
import { IStates } from '@/type/inedx'
import { MusicInfoI } from './PlayMusic'
import { IGetMusicInfo } from '@/plugins/Mp3/types/info'
import { parseLyric, adjustTime } from '@/untils/index'
import { getLyric } from '@/api/request'
import { useHistory } from 'react-router-dom'

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
  const [precent, setPrecent] = React.useState<any>(0)
  const [currTime, setCurrTime ] = React.useState<string>('00:00')
  const [lyricTime, setlyricTime ] = React.useState<string>('00:00')

  React.useEffect(() => {
    const gdList = props.GlobalPlayList
    
    if (gdList.playlist) {
      let lyric: any
      let count = 0
      let ln = 0

      // ;(window as any).player.init({}, gdList.playlist.trackIds)
      ;(window as any).player.on('readly', (async (musicInfo: IGetMusicInfo) => {
          
      ;(gdList.playlist.tracks as any)[musicInfo.index] && setMusicInfo((gdList.playlist.tracks as any)[musicInfo.index])

        setlyricTime(() => adjustTime(musicInfo.duration))

        const res = await getLyric({id: (gdList.playlist.tracks as any)[musicInfo.index].id})
        
        if (!res.lrc) {
          setIndexLyric(0)
        } else {
          lyric = parseLyric(res.lrc.lyric)
          ln = lyric.length

          setLyric(lyric)
          setIndexLyric(0)
        }

        count = 0
      }))

      ;(window as any).player.on('timeupdate', ((musicInfo: any) => {
        
        setPrecent(() => {
          return musicInfo.currentTime / musicInfo.duration * 100
        })

        setCurrTime(() => adjustTime(musicInfo.currentTime))
        

        if (count < ln - 1 && lyric && musicInfo.currentTime * 1000 >= lyric[count+1][0]) {
          count++
          setIndexLyric(count)
        }

      }))
    }
  }, [props.GlobalPlayList])

  const handlePlayBtn = (): void => {
    !play ? (window as any).player.play() : (window as any).player.pause()
    setPlay(!play)
  }

  return (
    <div className={styles._musicBar}>
      <div className={styles.playerCover}>
        <img src={`${musicInfo.al.picUrl}?param=80y80`} alt="" className={play? `${styles.coverRotate}` : ''} />
        <i className={`${styles.playBtn} icon-font`} onClick={handlePlayBtn}>{ !play ? <>&#xe6a4;</> : <>&#xe63a;</>}</i>
      </div>
      <div onClick={() => history.push('/player')}>
        这是歌词！！！！！！！
      </div>
    </div>
  )
}

const mapStateToProps = (state: IStates): { GlobalPlayList: any } => ({
  GlobalPlayList: state.playList
})

export default connect(mapStateToProps)(MusicBar)