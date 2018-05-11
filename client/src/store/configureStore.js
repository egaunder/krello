import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from './rootReducer'

const store = createStore(
  reducer, /* preloadedState, */
  devToolsEnhancer(/* Specify custom devTools options */),
)

export default store
