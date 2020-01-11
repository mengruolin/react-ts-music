import { ModifyAction } from '@/store/actions'
import { DECREMENT, INCREMENT, SETLOADING, SETPLAYLIST } from '@/store/const'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { IStates, initState } from '@/type/inedx'

//import { combineReducers } from 'redux'

const reducer = (state: IStates = initState, action: ModifyAction): any => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {count: state.count + 1})
    case DECREMENT:
      return Object.assign({}, state, {count: state.count + 1})
    case SETLOADING:
      return Object.assign({}, state, {
        loadingGroup: {
          globalLoaing: action.payload.loading
        }
      } as IStates)
    case SETPLAYLIST:
      return Object.assign({}, state, {playList: action.list})
    default:
      return state
  }
}

export default createStore(
  reducer,
  initState,
  applyMiddleware(thunk)
)