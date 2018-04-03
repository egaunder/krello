import { empty } from '../helperFunctions'

export const emailValidate = (email = '', errors = {}) => {
  if (!empty(email)) {
    email = email.trim()
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = 'Please enter a valid email'
      return errors
    }
    return errors
  }
  errors.email = 'Email cannot be empty'
  return errors
}

// Field cannot be empty
export const inputFieldNotEmpty = (val = '', fieldName = '', errors = {}) => {
  if (empty(val) || val === '' || val.length === 0) {
    errors[fieldName] = `${fieldName} cannot be empty`
    return errors
  }
  return errors
}

export const validateMinLength = (val = '', min = 1, fieldName = '', errors = {}) => {
  if (empty(val)) {
    errors[fieldName] = `${fieldName} cannont be empty`
    return errors
  }

  if (typeof val !== 'string') {
    errors[fieldName] = `${fieldName} has invalid format`
    return errors
  }
  if (val.length < min) {
    errors[fieldName] = `${fieldName} length cannont be less than ${min}`
    return errors
  }
  return errors
}

export const validateMaxLength = (val = '', max = 1, fieldName = '', errors = {}) => {
  if (empty(val)) {
    errors[fieldName] = `${fieldName} cannont be empty`
    return errors
  }

  if (typeof val !== 'string') {
    errors[fieldName] = `${fieldName} has invalid format`
    return errors
  }

  if (val.length > max) {
    errors[fieldName] = `${fieldName} length cannont be less than ${max}`
    return errors
  }
  return errors
}
