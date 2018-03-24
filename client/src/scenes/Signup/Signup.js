import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import ReduxInputField from '../../components/ReduxInputField/ReduxInputField'

import './Signup.css'

const validate = () => { }

const Signup = props => {
  const { handleSubmit } = props

  return (
    <div className="signup">
      <section className="signup__sect">
        <h1 className="signup__title">Krello Signup Form</h1>
        <form className="form">
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
          <input type="submit" id="submit" value="Create new account" />
        </form>
      </section>
    </div>
  )
}

export default reduxForm({ validate, form: 'signup', enableReinitialize: true })(Signup)
