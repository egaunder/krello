import * as types from './types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return { ...state, signupRequest: action.payload, auth: false }
    case types.SIGNUP_SUCCESS:
      return { ...state, user: action.payload, auth: true }
    case types.SIGNUP_FAILURE:
      return { ...state, error: action.payload, auth: false }
    case types.LOGIN_REQUEST:
      return { ...state, loginRequest: action.payload, auth: false }
    case types.LOGIN_SUCCESS:
      return { ...state, user: action.payload, auth: true }
    case types.LOGIN_FAILURE:
      return { ...state, error: action.payload, auth: false }
    default:
      return state
  }
}
