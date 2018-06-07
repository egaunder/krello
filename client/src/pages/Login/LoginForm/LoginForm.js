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
import { loginRequest, loginSuccess, loginFailure } from '../../../store/data/auth/actions'
import { addFlashMessage } from '../../../store/data/flashMessage/actions'

import './LoginForm.css'

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
  return errors
}

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      loginRequest: PropTypes.func,
      loginSuccess: PropTypes.func,
      loginFailure: PropTypes.func,
      addFlashMessage: PropTypes.func,
    }).isRequired,
  }

  static contextTypes = { router: PropTypes.object.isRequired }

  submit = values => {
    const { loginRequest, loginSuccess, loginFailure, addFlashMessage } = this.props.actions

    loginRequest()
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:5000/auth/login', values)
        .then(response => {
          if (response) {
            const { data } = response
            loginSuccess(data)
            addFlashMessage({ message: 'Successfully logged in', category: 'success' })
            this.context.router.history.push('/')
          }
        })
        .catch(err => {
          const { error } = err.response.data
          loginFailure(error)
          addFlashMessage({ message: 'Login failed', category: 'danger' })
          reject(new SubmissionError(error))
        })
    })
  }

  render() {
    const { handleSubmit } = this.props
    return (
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
        {/* <Button
          type="submit"
          text="Click to register"
          onClick={() => { }}
          style={{ backgroundColor: '#62b856' }}
        /> */}
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loginRequest,
      loginSuccess,
      loginFailure,
      addFlashMessage,
    }, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'login' })(LoginForm))
