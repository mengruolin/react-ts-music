import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import Index from '@/container/Index'
// import OilLoading from '@/components/loading/OilLoading'
// import PlayMusic from '@/container/PlayMusic'
//import DefaultLayout from '@/components/DefaultLayout'
const Index = lazy(() => import('@/container/Index'))
const OilLoading = lazy(() => import('@/components/loading/OilLoading'))
const PlayMusic = lazy(() => import('@/container/PlayMusic'))
const DefaultLayout = lazy(() => import('@/components/DefaultLayout'))
const InitPlayer = lazy(() => import('@/container/InitPlayer'))
// import SongMenuC from '@/components/SongMenu'
const SongMenu = lazy(() => import('@/components/SongMenu'))

export default function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}