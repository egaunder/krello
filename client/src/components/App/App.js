import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Home from '../../scenes/Home/Home'
import Login from '../../scenes/Login/Login'
import Signup from '../../scenes/Signup/Signup'

const App = () => (
  <div id="app>" >
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/" exact render={() => <Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  </div >
)

export default App
