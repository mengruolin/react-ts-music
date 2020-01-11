import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from '@/container/Index'
import OilLoading from '@/components/loading/OilLoading'
import PlayMusic from '@/container/PlayMusic'
import DefaultLayout from '@/components/DefaultLayout'
import InitPlayer from '@/container/InitPlayer'
import SongMenu from '@/components/SongMenu'

export default function () {
  return (
    <BrowserRouter>
      <InitPlayer />
      <OilLoading/>
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Index} ></Route>
          <Route exact path="/player" component={PlayMusic} ></Route>
          <Route exact path="/songMenu" component={SongMenu}></Route>
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  )
}