import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../views/App'
import Home from '../views/pages/home'
import DefaultLayout from '../views/layout/default'
import Player from '../components/player';

export default function () {
  return (
    <BrowserRouter>
      <Player />
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Home} ></Route>
          <Route exact path="/app" component={App} ></Route>
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  )
}