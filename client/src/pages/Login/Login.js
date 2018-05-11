import React from 'react'
import LoginForm from './LoginForm/LoginForm'

import './Login.css'

const Login = () => (
  <div className="login">
    <div className="login__sect">
      <h1 className="login__title">Krello Login Form</h1>
      <LoginForm />
    </div>
  </div>
)

export default Login
