import React, { Component } from 'react'
import axios from 'axios'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReduxInputField from '../../../components/ReduxInputField/ReduxInputField'
import {
  isValidEmail,
  inputFieldNotEmpty,
  isValidMinLength,
  isValidMaxLength,
} from '../../../utils/forms/form.validations'
import { signupRequest, signupSuccess, signupFailure } from '../../../store/data/auth/actions'
import { addFlashMessage } from '../../../store/data/flashMessage/actions'
import './SignupForm.css'

const validate = values => {
  const errors = {}
  const { username, email, password, passwordConfirmation } = values

  if (inputFieldNotEmpty(username)) {
    if (!isValidMinLength(username, 4)) {
      errors.username = 'Length cannot be less than 4'
    }

    if (!isValidMaxLength(username, 10)) {
      errors.username = 'Length cannot be more than 10'
    }
  } else {
    errors.username = 'Cannot be empty'
  }

  if (inputFieldNotEmpty(email)) {
    if (!isValidMinLength(email, 4)) {
      errors.email = 'Length cannot be less than 4'
    }

    if (!isValidEmail(email, errors)) {
      errors.email = 'Invalid format'
    }
  } else {
    errors.email = 'Cannot be empty'
  }

  if (inputFieldNotEmpty(password)) {
    if (!isValidMinLength(password, 3)) {
      errors.password = 'Length cannot be less than 3'
    }
  } else {
    errors.password = 'Cannot be empty'
  }

  if (inputFieldNotEmpty(passwordConfirmation)) {
    if (!isValidMinLength(passwordConfirmation, 3)) {
      errors.passwordConfirmation = 'Length cannot be less than 3'
    }
  } else {
    errors.passwordConfirmation = 'Cannot be empty'
  }

  return errors
}

class SignupForm extends Component {
  static contextTypes = { router: PropTypes.object.isRequired }

  submit = values => {
    const { signupRequest, signupSuccess, signupFailure, addFlashMessage } = this.props.actions
    signupRequest()
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5000/auth/signup', values)
        .then(response => {
          const { data } = response
          signupSuccess(data)
          resolve(data)
          addFlashMessage({ message: 'Successfully signed up', category: 'success' })
          return this.context.router.history.push('/')
        })
        .catch(error => {
          signupFailure(error.response.data.error)
          addFlashMessage({ message: 'Signup failed', category: 'error' })
          return reject(new SubmissionError(error.response.data.error))
        })
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div className="signup__sect">
        <h1 className="signup__title">Krello Signup Form</h1>
        <form className="form" onSubmit={handleSubmit(this.submit)}>
          <Field
            label="Email"
            name="email"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your email address"
          />
          <Field
            label="Username"
            name="username"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your username"
          />
          <Field
            label="Password"
            name="password"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your password"
          />
          <Field
            label="Password confirmation"
            name="passwordConfirmation"
            component={ReduxInputField}
            type="text"
            placeholder="Enter your password confirmation"
          />
          {/* <Button
            type="submit"
            text="Click to register"
            onClick={() => { }}
            style={{ backgroundColor: '#62b856' }}
          /> */}
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        signupRequest,
        signupSuccess,
        signupFailure,
        addFlashMessage,
      },
      dispatch,
    ),
  }
}

SignupForm.contextTypes = { router: PropTypes.object.isRequired }

SignupForm.propTypes = {
  actions: PropTypes.shape({
    signupRequest: PropTypes.func.isRequired,
    signupSuccess: PropTypes.func.isRequired,
    signupFailure: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

// enableReinitialize: true passed to reduxForm allows form to reinitialzie with
// new pristine values every time initialValues prop changes
export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'signup', enableReinitialize: true })(SignupForm))
