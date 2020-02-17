import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Index = lazy(() => import('@/container/Index'))
const OilLoading = lazy(() => import('@/components/loading/OilLoading'))
const PlayMusic = lazy(() => import('@/container/PlayMusic'))
const DefaultLayout = lazy(() => import('@/components/DefaultLayout'))
const InitPlayer = lazy(() => import('@/container/InitPlayer'))
const SongMenu = lazy(() => import('@/container/SongMenu'))
const songResult = lazy(() => import('@/components/SongResults'))
const myMenu = lazy(() => import('@/container/MyMenu'))

export default function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <OilLoading/>
        <InitPlayer />
        <DefaultLayout>
          <Switch>
            <Route exact path="/" component={Index} ></Route>
            <Route exact path="/player" component={PlayMusic} ></Route>
            <Route exact path="/songMenu" component={SongMenu}></Route>
            <Route exact path="/songResult" component={songResult}></Route>
            <Route exact path="/myMenu" component={myMenu}></Route>
          </Switch>
        </DefaultLayout>
      </BrowserRouter>
    </Suspense>
  )
}