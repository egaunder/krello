import React from 'react'
import PropTypes from 'prop-types'
import './ReduxInputField.css'

const ReduxInputField = props => {
  const { input, label, type, placeholder, meta: { touched, error } } = props
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

ReduxInputField.propTypes = {
  meta: PropTypes.shape({ touched: PropTypes.bool, error: PropTypes.string }).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
}

export default ReduxInputField
