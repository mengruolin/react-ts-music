import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Toast, List, Button } from 'antd-mobile'

import { getPlaylistDetail } from '@/api/request'
import styles from './_styles/SongMenu.module.scss'
import { MusicInfoI } from '@/container/PlayMusic'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { globalStates } from '@/type/inedx'
import { CHANGE_PLAY_LIST } from '@/store/actions'

interface IProps {
  changeGlobalList: (playList: any[]) => void
}

interface ISongMenu {
  playlist: {
    coverImgUrl?: string
    name?: string
    trackCount?: number
    tracks: MusicInfoI[]
  }
}

const SongMenu: React.SFC<IProps> = (props) => {
  const Item = List.Item
  const location = useLocation()
  const history = useHistory()

  const [songMenu, setSongMenu] = React.useState<ISongMenu>({
    playlist: {coverImgUrl: '', name: 'loading', trackCount: 0, tracks: []}
  })

  React.useEffect(() => {
    mounted(location.state.id)
  }, [location.state.id])

  const mounted = async (id: string) => {
    let res = await getPlaylistDetail({id})
    if (res.code === 200) {
      setSongMenu(res)
    } else {
      Toast.fail('获取歌单详情失败。')
    }
  }

  const handlePlayMusic = (playAll: boolean, index?: number): void => {
    props.changeGlobalList(songMenu.playlist.tracks)

    if(!playAll) {
      setTimeout(() => {
        window.player.setPlayMusic(index)
      }, 0)
    }
  }
  return(
    <div className={styles.songMenu}>
      <div className={styles.cover}>
        <img src={ `${songMenu.playlist.coverImgUrl}?param=600y300` } alt="" />
          <i className={`${styles.goBack} icon-font`} onClick={() => history.go(-1)}>&#xe716;{songMenu.playlist.name}</i>
      </div>
      <div className={styles.main}>
        <div className={styles.musicList}>
          <div className={styles.btnGroup}>
            <Button className={styles.playAll} onClick={() => handlePlayMusic(true)}>
            <i className="icon-font">&#xe701;</i>播放全部</Button>
            <div className={styles.otherHander}></div>
          </div>
          <div className={styles.listGroup}>
            <List renderHeader={() => (`共${songMenu.playlist.trackCount}首`)} className="my-list">
              { songMenu.playlist.tracks.map((item: any, key: number) => (
                  <Item extra={(<i className="icon-font" onClick={() => handlePlayMusic(false, key)}>&#xe701;</i>)} key={key} style={{height: '8vh'}}>
                    <span className={styles.musicName}>{item.name}</span>
                    <span className={styles.musicAuto}>{`\t-\t${item.ar[0].name}`}</span></Item>)
                )}
            </List>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: globalStates) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeGlobalList: (playList: any[]) => dispatch(CHANGE_PLAY_LIST(playList))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongMenu)