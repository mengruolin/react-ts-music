import React, { useEffect } from 'react'
import Mp3 from '@/plugins/Mp3'
import { connect } from 'react-redux';
import { globalStates } from '@/type/inedx';
import { getMusicListAction, CHANGE_LOCAL_MUSIC, CHANGE_PLAY_LIST } from '@/store/actions';
declare var window: any

export interface IProps {
  onGetPlayList: (id: string) => void
  setLocalMusic: (musicList: any[], musicIds: any[]) => void
  changeGlobalList: (playList: any[]) => void
  GlobalPlayList: any
}

// interface State {
//   nowPlay: playListI;
// }

const InitPlayer: React.SFC<IProps> = (props) => {

  const {setLocalMusic, changeGlobalList, onGetPlayList} = props
  
  useEffect(() => {
    //播放器初始化挂载到 window 上，其他页面使用 window.player 访问
    const player = new Mp3('globalAudio')
    window.player = player
    window.player.init({}, [])

    // 看是否有本地收藏，有的话初始化加载本地收藏歌单
    if (window.localStorage.getItem('localMusicIds')) {
      let localMusics = JSON.parse(window.localStorage.getItem('localMusics'))
      let localMusicIds = JSON.parse(window.localStorage.getItem('localMusicIds'))

      setLocalMusic(localMusics, localMusicIds)
      changeGlobalList(localMusics)
    } else {
      //获取mrl 的网易云歌单号
      onGetPlayList('524176061')
    }
  }, [setLocalMusic, changeGlobalList, onGetPlayList])

  useEffect(() => {
    // 监听 redux 全局播放列表，改动后 使用 replaceMusicList 替换播放列表
    props.GlobalPlayList[0] && window.player.replaceMusicList(props.GlobalPlayList)
  }, [props.GlobalPlayList])

  return (
    <>
      <audio id="globalAudio"></audio>
    </>
  )
}

const mapStateToProps = (state: globalStates): { GlobalPlayList: any } => ({
  //全局播放列表
  GlobalPlayList: state.globalReducer.playList
})

const mapDispatchToProps = (dispatch: any) => ({
  //全局播放列表
  onGetPlayList: (id: string) => dispatch(getMusicListAction({id})),
  setLocalMusic: (musicList: any[], musicIds: any[]) => dispatch(CHANGE_LOCAL_MUSIC(musicList, musicIds)),
  changeGlobalList: (playList: any[]) => dispatch(CHANGE_PLAY_LIST(playList))
})

export default connect(mapStateToProps, mapDispatchToProps)(InitPlayer)