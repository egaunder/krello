import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import ReduxInputField from '../../components/ReduxInputField/ReduxInputField'
import Button from '../../components/Button/Button'
import {
  isValidEmail,
  inputFieldNotEmpty,
  isValidMinLength,
  isValidMaxLength,
} from '../../utils/forms/form.validations'

import './Signup.css'

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

const submit = () => { console.log('submit') }

const Signup = props => {
  const { handleSubmit } = props

  return (
    <div className="signup">
      <section className="signup__sect">
        <h1 className="signup__title">Krello Signup Form</h1>
        <form className="form" onSubmit={handleSubmit(submit)}>
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
          <Button type="submit" text="Click to register" onClick={() => { }} style={{ backgroundColor: '#62b856' }} />
        </form>
      </section>
    </div>
  )
}

// enableReinitialize: true passed to reduxForm allows form to reinitialzie with
// new pristine values every time initialValues prop changes
export default reduxForm({ validate, form: 'signup', enableReinitialize: true })(Signup)
