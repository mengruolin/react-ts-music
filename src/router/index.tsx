import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/views/pages/home'
import DefaultLayout from '@/views/layout/default'
import Player from '@/components/player';

export default function () {
  return (
    <BrowserRouter>
      <Player />
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Home} ></Route>
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  )
}