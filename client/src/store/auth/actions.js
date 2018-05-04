import axios from 'axios'
import * as types from './types'

export const signupRequest = () => ({
  type: types.SIGNUP_REQUEST,
  payload: true,
})

export const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  payload: user,
})

export const signupFailure = error => ({
  type: types.SIGNUP_FAILURE,
  payload: error,
})
