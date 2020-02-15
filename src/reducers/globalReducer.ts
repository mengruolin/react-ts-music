import { ModifyAction } from '@/store/actions'
import { SETLOADING, SETPLAYLIST } from '@/store/const'
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
    }
  })

export default globalReducer