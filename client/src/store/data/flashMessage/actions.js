import * as types from './types'

export const addFlashMessage = data => ({
  type: types.ADD_FLASH_MESSAGE,
  payload: data,
})

export const removeFlashMessage = () => ({ type: types.REMOVE_FLASH_MESSAGE })
