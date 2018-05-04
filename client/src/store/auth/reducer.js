import * as types from './types'

export default (state = {}, action = {}) => {
  switch (action) {
    case types.SIGNUP_REQUEST:
      return { ...state, signupRequest: action.payload }
    case types.SIGNUP_SUCCESS:
      return { ...state, user: action.payload }
    case types.SIGNUP_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
