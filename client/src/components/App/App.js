import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Home from '../../scenes/Home/Home'
import Login from '../../scenes/Login/Login'

const App = () => (
  <div id="app>" >
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <Route path="/" exact render={() => <Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  </div >
)

export default App
