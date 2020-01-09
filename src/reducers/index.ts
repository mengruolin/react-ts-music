import { ModifyAction } from '@/store/actions'
import { DECREMENT, INCREMENT } from '@/store/const'
import { createStore } from 'redux'

//import { combineReducers } from 'redux'

const reducer = (state = 0, action: ModifyAction): number => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

export default createStore(reducer)