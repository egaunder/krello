import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import FlashMessagePanel from './FlashMessagePanel/FlashMessagePanel'
import { removeFlashMessage } from '../../store/data/flashMessage/actions'

import './FlashMessage.css'

class FlashMessage extends Component {
  static propTypes = {
    message: PropTypes.string,
    category: PropTypes.string,
    actions: PropTypes.shape({ removeFlashMessage: PropTypes.func.isRequired }).isRequired,
    display: PropTypes.bool,
  }

  static defaultProps = { message: '', category: 'success', display: false }

  state = { display: false }

  componentWillReceiveProps(nextProps) {
    if (this.props.display !== nextProps.display) {
      this.setState({ display: nextProps.display })
    }
  }

  render() {
    const { message, category } = this.props
    const { display } = this.state
    const { removeFlashMessage } = this.props.actions
    const shouldDisplay = display ? 'grid' : 'none'
    return (
      <div className="flash-message" style={{ display: shouldDisplay }}>
        <FlashMessagePanel close={removeFlashMessage} message={message} category={category} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.flashMessage.message,
    display: state.flashMessage.display,
    category: state.flashMessage.category,
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ removeFlashMessage }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)
