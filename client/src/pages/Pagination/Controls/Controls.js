import React from 'react'
import PropTypes from 'prop-types'

import './Controls.css'

const Controls = ({ onPrev, onNext }) => (
  <div className="controls">
    <button className="control__button control__button__left" onClick={onPrev}>Prev</button>
    <button className="control__button control__button__right" onClick={onNext}>Next</button>
  </div>
)

Controls.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
}

export default Controls
