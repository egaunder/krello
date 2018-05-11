import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/configureStore'
// import registerServiceWorker from './registerServiceWorker'
import App from './App/App'

// registerServiceWorker()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

