import React from 'react'
import PropTypes from 'prop-types'

import './NavButton.css'

const NavButton = props => (
  <div className="nav-button-wrapper">
    {props.render()}
  </div>
)

NavButton.propTypes = { render: PropTypes.func.isRequired }

export default NavButton
