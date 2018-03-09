import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import KrelloRouter from './routes'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<KrelloRouter />, document.getElementById('root'))
registerServiceWorker()
