import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import globalReducer from './globalReducer'

const rootReducer: any = combineReducers({
  globalReducer,
})

const configureStore = (preloadedState?: any) => {
  const middlewares = [thunk]
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, preloadedState, middlewareEnhancer)
  
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }

  return store
}

export default configureStore()
