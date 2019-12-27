import React from 'react'
import { Link } from 'react-router-dom'
// const defaultHeader = React.lazy(() => import('./_parts/header'));
import MyHeader from './_parts/header'
import { Button } from 'antd-mobile';
import MusicBar from '../../components/MusicBar'

export interface Props {
  children: React.ReactNode;
}

const defaultLayout: React.FC<Props> = (props) => {
  return (
    <>
      <MyHeader />
      <Button onClick={ () => { (window as any).player.play() } }>play.</Button>
      <Link to="/app">11</Link>
      <MusicBar />
      { props.children }
    </>
  )
}

export default defaultLayout