import * as types from './types'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        category: action.payload.category,
        display: true,
      }
    case types.REMOVE_FLASH_MESSAGE:
      return { ...state, message: '', display: false }
    default:
      return state
  }
}
