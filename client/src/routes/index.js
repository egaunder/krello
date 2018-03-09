import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Header from '../containers/Header/Header'

const KrelloRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Header} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default KrelloRouter
