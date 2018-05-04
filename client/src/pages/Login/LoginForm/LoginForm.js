import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  isValidEmail,
  inputFieldNotEmpty,
  isValidMinLength,
  isValidMaxLength,
} from '../../../utils/forms/form.validations'

const validate = values => {
  const { email, password } = values
  const errors = {}

  if (inputFieldNotEmpty(email)) {
    if (!isValidMinLength(email, 4)) {
      errors.email = 'Length cannot be less than 4'
    }

    if (!isValidEmail(email, errors)) {
      errors.email = 'Invalid format'
    }
  } else {
    errors.email = 'Email cannot be empty'
  }

  if (inputFieldNotEmpty(password)) {
    if (!isValidMinLength(password, 3)) {
      errors.password = 'Length cannot be less than 3'
    }
  } else {
    errors.password = 'Cannot be empty'
  }
}

class LoginForm extends Component {
  static propTypes = {}

  submit = values => {
    // Hello
  }

  render() {
    return <div />
  }
}

export default LoginForm
