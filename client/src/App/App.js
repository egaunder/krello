import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import FlashMessage from '../containers/FlashMessage/FlashMessage'

const App = () => (
  <div id="app>">
    <BrowserRouter>
      <div>
        <FlashMessage />
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/" exact render={() => <Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
)

export default App
