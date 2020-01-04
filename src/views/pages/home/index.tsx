import * as React from 'react';
import './_styles/index.scss'
import { getPlaylistDetail } from '../../../api/request';
import { Button } from 'antd-mobile';

export interface Props {
}

const Home: React.FC = () => {
  
  React.useEffect(() => {
    (async function () {
      const gdList = await getPlaylistDetail({id: '524176061'})
      const trackIds: any = gdList.playlist.trackIds
      // const tracks = gdList.playlist.tracks
      console.log(trackIds);
      
      (window as any).player.replaceMusicList(trackIds)
      //(window as any).player.play()
      
    })()
    
  }, [])

  function handlePlay() {
    (window as any).player.play()
  }
  
  return(
    <div className="_home">
      <div className="_main"></div>
      <div className="btn-group">
        <Button className="_home-btn play-btn" onClick={handlePlay} />
        <Button className="_home-btn next-btn" onClick={handlePlay} />
      </div>
    </div>
  )
}

export default Home
