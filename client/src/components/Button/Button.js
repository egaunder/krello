import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = props => {
  const handleClick = e => {
    props.onClick(e)
  }

  return <button type={props.type} style={props.style} onClick={handleClick}>{props.text}</button>
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export default Button
