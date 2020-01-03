import React from 'react'
import MyHeader from './_parts/header'
import MusicBar from '../../components/MusicBar'
import './_styles/default-layout.scss'
import http from '../../api/http'

export interface Props {
  children: React.ReactNode;
}

export default class DefaultLayout extends React.Component<Props, any> {
  // constructor(props: Props) {
  //   super(props)
  // }

  componentDidMount() {
    http.get('/user/followeds?uid=32953014')
  }

  render() {
    return (
      <>
        <div className="_header">
          <MyHeader />
        </div>
        <div className="_main">
          { this.props.children }
        </div>
        <div className="_footer">
          <MusicBar />
        </div>
      </>
    )
  }
}