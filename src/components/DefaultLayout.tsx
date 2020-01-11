import React /*, { useEffect } */ from 'react'
//import MyHeader from './_parts/header'
import MusicBar from '@/container/MusicBar'
import styles from './_styles/defaultLayout.module.scss'
type styles = any

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = (props: Props) => {
  
  return(
    <div className={styles._defaultLayout}>
      <div className={styles._header}>
        
      </div>
      <div className={styles._main}>
        { props.children }
      </div>
      <div className={styles._footer}>
        <MusicBar />
      </div>
    </div>
)
}

export default DefaultLayout
