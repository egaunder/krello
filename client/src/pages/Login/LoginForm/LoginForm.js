import React, { Component } from 'react'
import axios from 'axios'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import ReduxInputField from '../../../components/ReduxInputField/ReduxInputField'
import {
  isValidEmail,
  inputFieldNotEmpty,
  isValidMinLength,
} from '../../../utils/forms/form.validations'
import { rejects } from 'assert'

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
  submit = values => {
  }

  render() {
    const handleSubmit = this.props
    return (
      <div className="login_sect">
        <h1 className="login_title">Krello Login Form</h1>
        <form className="form" onSubmit={handleSubmit(this.submit)}>
          <Field
            label="Email"
            name="email"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your email address"
          />
          <Field
            label="Password"
            name="password"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your password"
          />
        </form>
      </div>
    )
  }
}

export default connect(null, null)(reduxForm({ validate, form: 'login' })(LoginForm))
