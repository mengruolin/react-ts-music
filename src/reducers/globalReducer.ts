import { ModifyAction, } from '@/store/actions'
import { SETLOADING, SETPLAYLIST, SET_PLAY_LYRIC, SET_PLAY_MUSIC, SET_LOCAL_MUSIC, SET_PLAY_MUSIC_LOVE } from '@/store/const'
import { IGlobalReducerStates, initState } from '@/type/globalReducerState'
import produce from 'immer'

const globalReducer = (state: IGlobalReducerStates = initState, action: ModifyAction): any => 
  produce(state, draft => {
    switch (action.type) {
      case SETLOADING:
        draft.loadingGroup.globalLoaing = action.payload.loading
        break
      case SETPLAYLIST:
        draft.playList = action.list
        break
      case SET_PLAY_LYRIC:
        draft.currMusicInfo.lyric = action.lyric
        break
      case SET_PLAY_MUSIC:
        draft.currMusicInfo.detailInfo = action.currMusic
        draft.currMusicInfo.isLove = draft.localDB.localMusicIds.includes(action.currMusic.id)
        break
      case SET_PLAY_MUSIC_LOVE:
        draft.currMusicInfo.isLove = action.state
        break
      case SET_LOCAL_MUSIC:
        draft.localDB.localMusicList = action.musicList
        draft.localDB.localMusicIds = action.musicIds
        break
    }
  })

export default globalReducer