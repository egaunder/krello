import React from 'react'
import PropTypes from 'prop-types'
import './LoginButton.css'

const LoginButton = props => (
  <button id="login-button">{props.text}</button>
)

LoginButton.propTypes = { text: PropTypes.string.isRequired }

export default LoginButton
