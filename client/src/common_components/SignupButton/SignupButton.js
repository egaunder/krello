import React from 'react'
import PropTypes from 'prop-types'
import './SignupButton.css'

const SignupButton = props => (
  <button className="signup__button" onClick={() => props.onClick()}>Signup</button>
)

SignupButton.propTypes = { onClick: PropTypes.func.isRequired }

export default SignupButton
