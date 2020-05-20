import React, { useEffect } from 'react'
import Mp3 from '@/plugins/Mp3'
import { connect } from 'react-redux';
// import { Dispatch, bindActionCreators } from 'redux';
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
    const player = new Mp3('globalAudio')
    window.player = player
    
    window.player.init({}, [])

    if (window.localStorage.getItem('localMusicIds')) {
      let localMusics = JSON.parse(window.localStorage.getItem('localMusics'))
      let localMusicIds = JSON.parse(window.localStorage.getItem('localMusicIds'))

      setLocalMusic(localMusics, localMusicIds)
      changeGlobalList(localMusics)
    } else {
      onGetPlayList('524176061')
    }
  }, [setLocalMusic, changeGlobalList, onGetPlayList])

  useEffect(() => {
    props.GlobalPlayList[0] && window.player.replaceMusicList(props.GlobalPlayList)
  }, [props.GlobalPlayList])

  return (
    <>
      <audio id="globalAudio"></audio>
    </>
  )
}

const mapStateToProps = (state: globalStates): { GlobalPlayList: any } => ({
  GlobalPlayList: state.globalReducer.playList
})

const mapDispatchToProps = (dispatch: any) => ({
  onGetPlayList: (id: string) => dispatch(getMusicListAction({id})),
  setLocalMusic: (musicList: any[], musicIds: any[]) => dispatch(CHANGE_LOCAL_MUSIC(musicList, musicIds)),
  changeGlobalList: (playList: any[]) => dispatch(CHANGE_PLAY_LIST(playList))
})

export default connect(mapStateToProps, mapDispatchToProps)(InitPlayer)