import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Header from '../containers/Header/Header'

const KrelloRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch />
    </div>
  </BrowserRouter>
)

export default KrelloRouter
