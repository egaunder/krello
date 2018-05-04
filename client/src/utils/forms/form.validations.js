import { empty } from '../helperFunctions'

export const isValidEmail = (email = '') => {
  if (!empty(email)) {
    email = email.trim()
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return false
    }
    return true
  }
  return false
}

// Field cannot be empty
export const inputFieldNotEmpty = (val = '') => {
  if (empty(val) || val === '' || val.length === 0) {
    return false
  }
  return true
}

export const isValidMinLength = (val = '', min = 1) => {
  if (empty(val) || typeof val !== 'string') {
    return false
  }
  if (val.length > min) {
    return true
  }
  return false
}

export const isValidMaxLength = (val = '', max = 1) => {
  if (empty(val) || typeof val !== 'string') {
    return false
  }

  if (val.length < max) {
    return true
  }
  return false
}
