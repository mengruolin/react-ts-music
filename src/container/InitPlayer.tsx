import React, { useEffect } from 'react'
import Mp3 from '@/plugins/Mp3'
import { connect } from 'react-redux';
// import { Dispatch, bindActionCreators } from 'redux';
import { globalStates } from '@/type/inedx';
import { getMusicListAction } from '@/store/actions';
declare var window: any

export interface IProps {
  onGetPlayList: (id: string) => void
  GlobalPlayList: any
}

// interface State {
//   nowPlay: playListI;
// }

const InitPlayer: React.SFC<IProps> = (props) => {

  useEffect(() => {
    const player = new Mp3('globalAudio')
    window.player = player
    
    props.onGetPlayList('524176061')

    
  }, [])

  useEffect(() => {
    props.GlobalPlayList[0] && window.player.init({},  props.GlobalPlayList)
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
  onGetPlayList: (id: string) => dispatch(getMusicListAction({id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(InitPlayer)