import * as React from 'react'
import styles from './_styles/videoPlayPage.module.scss'
import VideoPlayer from './VideoPlayer'

interface IProps {}

const videoPlayPage: React.SFC<IProps> = (props) => {

  return (
    <div className={styles._layout}>
      <VideoPlayer />
    </div>
  )
}

export default videoPlayPage
