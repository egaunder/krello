import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import ReduxInputField from '../../components/ReduxInputField/ReduxInputField'
import Button from '../../components/Button/Button'
import './Signup.css'

const validate = () => { console.log('hey') }
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
