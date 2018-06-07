import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import FlashMessage from '../containers/FlashMessage/FlashMessage'
import Pagination from '../pages/Pagination/Pagination'

import './App.css'

// Dev Imports
import SubmitButton from '../common_components/LoginButton/LoginButton'

const App = () => (
  <div id="app">
    <BrowserRouter>
      <div>
        <FlashMessage />
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/SubmitButton" render={() => <SubmitButton />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/pagination" render={() => <Pagination />} />
          <Route path="/" exact render={() => <Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
)

export default App
