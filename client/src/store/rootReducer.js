import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './data/auth/reducer'
import flashMessage from './data/flashMessage/reducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  flashMessage,
})

export default rootReducer
