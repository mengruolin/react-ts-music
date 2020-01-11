import * as React from 'react'
import { connect } from 'react-redux'

import styles from './_styles/Index.module.scss'
import Caruse from '@/components/Caruse'
import { Toast } from 'antd-mobile'
import { getPersonalized } from '@/api/request'
import { useHistory } from 'react-router-dom'
import { getCNParseInt } from '@/untils'
// import IconReact from '@/assets/svg/item-like.svg'

interface IProps {

}

interface IGridDate {
  icon: string
  text: string
}

const Index: React.SFC<IProps> = (props: IProps) => {
  const [resetReq, setResetReq] = React.useState<boolean>(false)
  const [recommend, setRecommend] = React.useState<[]>([])

  const history = useHistory()

  React.useEffect(() => {
    resetEf()
  }, [resetReq])

  const resetEf = async () => {
    let res = await getPersonalized({limit: 9})
    if(res.code === 200) {
      setRecommend(res.result)
    } else {
      Toast.fail('获取推荐歌单失败!')
    }
    
  }

  const showDetail = (id: string): any => {
    history.push('/songMenu', {id})
  }

  // const onRefresh = (): void => {
  //   console.log(1)
  // }
  return(
    <div className={styles._Index}>
      <div className={styles._caruse}>
        <Caruse caruseInfo={[1,2,3]}/>
      </div>
      <div className={styles._item}>
        {/* <IconReact /> */}
      </div>
      <div className={styles.lsitTitle}>
        <span className={styles.title}><i className="icon-font c-mr20">&#xe605;</i>推荐歌单</span>
        <span className={styles.more}>More.</span>
      </div>
      <div className={styles._recommend}>
        {recommend.map((item: any, key: number) => (
          <div className={styles.recItem} key={key} onClick={() => showDetail(item.id)}>
            <div className={styles.recPick}>
              <img src={`${item.picUrl}?param=200y200`} alt={item.copywriter}/>
              <span className={styles.playCount}><i className="icon-font">&#xe6a4;</i>{ getCNParseInt(item.playCount)}</span>
            </div>
            <div className={styles.recName}>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.lsitTitle}>
        <span className={styles.title}><i className="icon-font c-mr20">&#xe6be;</i>新歌速递</span>
        <span className={styles.more}>More.</span>
      </div>

    </div>
  )
}


export default connect()(Index)