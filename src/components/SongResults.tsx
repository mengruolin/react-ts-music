import * as React from 'react'
import { getToplistDetail } from '@/api/request'
import { Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

import styles from './_styles/SongResults.module.scss'

interface IProps {}

const SongResults: React.SFC<IProps> = (props) => {

  const [recommend, setRecommend] = React.useState<any[]>([])
  const [wroldList, setWroldList] = React.useState<any[]>([])

  const history = useHistory()

  React.useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    let res = await getToplistDetail()

    if( res.code === 200 ) {
      //setToplistDetail(res.list)
      let recom: any[] = [], wrold: any[] =[]

      res.list.forEach((item: any) => { 
        if (item.tracks[0]) {
          recom.push(item)
        } else {
          wrold.push(item)
        }
      })

      setRecommend(recom)
      setWroldList(wrold)
    } else {
      Toast.fail('获取榜单失败！')
    }
  }

  const showDetail = (id: string): any => {
    history.push('/songMenu', {id})
  }

  return(
    <div className={styles._songResult}>
      <div className={styles.goBack}>
        <i className="icon-font" onClick={() => history.go(-1)}>&#xe716;</i>
        <span>&nbsp;&nbsp;&nbsp;排行榜</span>
      </div>
      <div className={styles._main}>
        <div className={styles.listTitle}>推荐榜单</div>
        {recommend.map((item: any, key: number) => (
          <div key={key} className={styles.recommList} onClick={() => showDetail(item.id)}>
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

        <div className={styles.listTitle}>全部榜单</div>
        {wroldList.map((item: any, key: number) => (
          <div key={key} className={styles.wroldList} onClick={() => showDetail(item.id)}>
            <div className={styles.imgCover}>
              <img src={`${item.coverImgUrl}?400y400`} alt=""/>
            </div>
            <div className={styles.listName}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SongResults