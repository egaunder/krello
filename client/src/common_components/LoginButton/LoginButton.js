import React from 'react'
import PropTypes from 'prop-types'
import './LoginButton.css'

const LoginButton = props => (
  <button className="login__button" onClick={() => props.onClick()}>Login</button>
)

LoginButton.propTypes = { onClick: PropTypes.func.isRequired }

export default LoginButton
