import React from 'react'
import PropTypes from 'prop-types'
import './SubmitButton.css'

const SubmitButton = props => (
  <button className="submit__button" onClick={() => props.onClick()} >Submit</button>
)

SubmitButton.propTypes = { onClick: PropTypes.func.isRequired }

export default SubmitButton
