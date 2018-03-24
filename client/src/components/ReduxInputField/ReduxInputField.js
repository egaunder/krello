import React from 'react'
import './ReduxInputField.css'

const ReduxInputField = field => {
  const { input, label, type, placeholder, meta: { touched, error } } = field
  const className = `form__group ${touched && error ? 'form__group--danger' : ''}`
  return (
    <div className={className}>
      <label htmlFor={`${label}`}>{label}</label>
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        {...input}
      />
      {touched && (error && <span className="help-block">{error}</span>)}
    </div>
  )
}

export default ReduxInputField
