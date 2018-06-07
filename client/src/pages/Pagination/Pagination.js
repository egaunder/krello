import React, { Component } from 'react'
import axios from 'axios'
import Controls from './Controls/Controls'

import './Pagination.css'

class Pagination extends Component {
  state = {
    content: [],
    loading: true,
  }


  componentDidMount() {
    axios.get('http://localhost:5000/test/numbers')
      .then(response => {
        console.log(response.data)
        if (response.data) {
          this.setState(currentState => ({
            content: response.data.numbers,
            loading: false,
          }))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  onNext = () => {
    console.log('on next')
  }

  onPrev = () => {
    console.log('on prev')
  }

  render() {
    return (
      <div className="pagination">
        <div className="pagination__content">
          Pagination Content
          {
            this.state.loading ?
              (<div>Loading...</div>) :
              (<div>numbers</div>)
          }
        </div>
        <div className="pagination__controls">
          Pagination Controls
          <Controls onNext={this.onNext} onPrev={this.onPrev} />
        </div>
      </div>
    )
  }
}


export default Pagination
