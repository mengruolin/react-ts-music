import React, { useEffect } from 'react'
import MyHeader from './_parts/header'
// import MusicBar from '../../components/MusicBar'
import './_styles/default-layout.scss'

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = (props: Props) => {
  
  useEffect(() => {
    console.log(1);
  }, [])
  
  return(
    <>
        <div className="_header">
          <MyHeader />
        </div>
        <div className="_main">
          { props.children }
        </div>
        {/* <div className="_footer">
          <MusicBar />
        </div> */}
      </>
  )
}

export default DefaultLayout
