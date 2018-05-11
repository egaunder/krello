import React from 'react'
import { PropTypes } from 'prop-types'

import './FlashMessagePanel.css'

const FlashMessagePanel = props => (
  <div className={`flash-message__panel alert ${props.category === 'success' ? 'alert-success' : 'alert-danger'}`}>
    {props.message}
    <button type="button" onClick={() => props.close()} className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
)

FlashMessagePanel.propTypes = {
  category: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}


export default FlashMessagePanel
