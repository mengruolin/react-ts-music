import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../views/App'
import DefaultLayout from '../views/layout/default'
import Player from '../components/player';

export default function () {
  return (
    <BrowserRouter>
      <Player children />
      <Switch>
        <Route exact path="/" component={DefaultLayout} ></Route>
        <Route exact path="/app" component={App} ></Route>
      </Switch>
    </BrowserRouter>
  )
}