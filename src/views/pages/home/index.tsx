import * as React from 'react'

import styles from './_styles/index.module.scss'
import OilLoading from '@/components/loading/OilLoading'

import { getPlaylistDetail, getLyric } from '@/api/request'
import { Button, Progress } from 'antd-mobile'
import { parseLyric } from '@/untils/index'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { decrement, increment } from '@/store/actions'
import { StoreState } from '@/type/inedx'

type styles = any;

interface IProp {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}
interface MusicInfoI {
  name: string
  id: number | string
  ar: {name?: string}[]
  al: {picUrl?: string}
}

interface GdListI {
  playlist: playlistI
}

interface playlistI {
  trackIds?: string
  tracks?: MusicInfoI[]
}


const Home: React.SFC<IProp> = (props: IProp) => {
  //const [init] = React.useState<boolean>(true)
  
  // play 按钮状态
  const [play, setPlay] = React.useState(false)
  
  //歌曲基础信息
  const [musicInfo, setMusicInfo] = React.useState<MusicInfoI>({
    name: '',
    id: '',
    ar: [{}],
    al: {},
  })

  const [loading, setLoading] = React.useState<boolean>(true) //global loading

  const [lyric, setLyric] = React.useState<[number, string][]>([[0, '暂无歌词！']]) // 歌词组
  const [indexLyric, setIndexLyric] = React.useState<any>(0)  //歌词当前句
  const [precent, setPrecent] = React.useState<any>(0)
  

  React.useEffect(() => {
    initPlayer()
  }, [])

  const initPlayer = async () => {
    const gdList: GdListI = await getPlaylistDetail({id: '524176061'})

    let lyric: any
    let count = 0
    let ln = 0

    ;(window as any).player.init({}, gdList.playlist.trackIds)
    setLoading(false)

    ;(window as any).player.on('readly', (async (i: any) => {
      
    (gdList.playlist.tracks as any)[i] && setMusicInfo((gdList.playlist.tracks as any)[i])

      const res = await getLyric({id: (gdList.playlist.tracks as any)[i].id})
      
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

      if (count < ln - 1 && lyric && musicInfo.currentTime * 1000 >= lyric[count+1][0]) {
        count++
        setIndexLyric(count)
      }

    }))
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
    <div className={styles._home}>
      <OilLoading show={loading}/>
      <div className={styles._homeMain}>
        <div className={styles.musicHeader}>
          <i className="icon-font">&#xe634;</i>
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
          <Progress className={styles.progressBox}
            percent={precent} 
            position="normal"
            barStyle={barStyle.progressStyle}
            style={barStyle.progressBoxStyle} />
        </div>
        <div className={styles.btnGroup}>
          <Button className={`${styles._homeBtn} ${styles.prevBtn}`} onClick={handlePrevBtn}>
            <i className={`icon-font x-y-center`}>&#xea44;</i></Button>
          <Button className={`${styles._homeBtn} ${styles.playBtn}`}
            onClick={handlePlayBtn}>
            <i className="icon-font x-y-center">{ !play ? <>&#xe6a4;</> : <>&#xe63a;</>}</i></Button>
          <Button className={`${styles._homeBtn} ${ styles.nextBtn}`} onClick={handleNextBtn}>
            <i className="icon-font x-y-center">&#xea47;</i></Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: StoreState): { value: number } => ({
  value: state
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDecrement: () => dispatch(decrement()),
  onIncrement: () => dispatch(increment())
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
