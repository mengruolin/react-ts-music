import * as React from 'react'
import { getToplistDetail } from '@/api/request'
import { Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

import styles from './_styles/SongResults.module.scss'
import BetScroll from '@/components/Scroll'

interface IProps {}

const SongResults: React.SFC<IProps> = (props) => {

  const [toplistDetail, setToplistDetail] = React.useState<[]>([])
  const history = useHistory()

  React.useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    let res = await getToplistDetail()

    if( res.code === 200 ) {
      setToplistDetail(res.list)
    } else {
      Toast.fail('获取榜单失败！')
    }
  }

  const betScrollData = () => {
    return {
      pullEvent: true,

    }
  }
  return(
    <div className={styles._songResult}>
      <div className={styles.goBack}>
        <i className="icon-font" onClick={() => history.go(-1)}>&#xe716;</i>
      </div>
      <div className={styles.scroll}>
        <BetScroll {...betScrollData()}>
          <div className={styles._main}>
          {toplistDetail.map((item: any, key: number) => (
            <div key={key} className={styles._list}>
              <div className={styles.imgCover}>
                <img src={`${item.coverImgUrl}?400y400`} alt=""/>
              </div>
              <div className={styles.songList}>
                {item.tracks.map((singer: any, key: number) => (
                  <div className={styles.songItems} key={`singer-${key}`} >
                    {key+1}.&nbsp;&nbsp;{singer.first}&nbsp;-&nbsp;{singer.second}
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </BetScroll>
      </div>
    </div>
  )
}

export default SongResults