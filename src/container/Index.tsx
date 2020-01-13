import * as React from 'react'
import { connect } from 'react-redux'

import styles from './_styles/Index.module.scss'
import Caruse from '@/components/Caruse'
import { Toast, List } from 'antd-mobile'
import { getPersonalized, getPersonalizedNewsong, getBanner } from '@/api/request'
import { useHistory } from 'react-router-dom'
import { getCNParseInt } from '@/untils'
import SvgItemLike from '@/assets/svg/item-like.svg'
import SvgSongFm from '@/assets/svg/song-fm.svg'
import SvgSongList from '@/assets/svg/song-list.svg'
import SvgHotComment from '@/assets/svg/hot-comment.svg'
import SvgSingerList from '@/assets/svg/singer-list.svg'

interface IProps {

}

interface IGridDate {
  icon: string
  text: string
}

const Index: React.SFC<IProps> = (props: IProps) => {
  const Item = List.Item

  const [resetReq, setResetReq] = React.useState<boolean>(false)
  const [recommendPlaylist, setRecommendPlaylist] = React.useState<[]>([])
  const [recommendedSong, setRecommendedSong] = React.useState<[]>([])
  const [caruseData, setCaruseData] = React.useState<[]>([])
  const history = useHistory()

  React.useEffect(() => {
    resetEf()
  }, [resetReq])

  const resetEf = async () => {

    let caruse = await getBanner({type: 2})
    if(caruse.code === 200) {
      setCaruseData(() => caruse.banners)
    } else {
      Toast.fail('获取独家放送失败!')
    }

    let res = await getPersonalized({limit: 9})
    if(res.code === 200) {
      setRecommendPlaylist(res.result)
    } else {
      Toast.fail('获取推荐歌单失败!')
    }
    
    let recommendedSong = await getPersonalizedNewsong({limit: 10})

    if(recommendedSong.code === 200) {
      setRecommendedSong(recommendedSong.result)
    } else {
      Toast.fail('获取推荐歌曲失败!')
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
        { caruseData.length > 0 ? <Caruse caruseInfo={caruseData}/> : ''}
      </div>
      <div className={styles._item}>
        <div className={styles.svgIcon}>
          <SvgItemLike width={'100%'} height={'100%'} />
        </div>
        <div className={styles.svgIcon}>
          <SvgSongList width={'100%'} height={'100%'} />
        </div>
        <div className={styles.svgIcon}>
          <SvgSingerList width={'100%'} height={'100%'} />
        </div>
        <div className={styles.svgIcon}>
          <SvgSongFm width={'100%'} height={'100%'} />
        </div>
        <div className={styles.svgIcon}>
          <SvgHotComment width={'100%'} height={'100%'} />
        </div>
      </div>
      <div className={styles.lsitTitle}>
        <span className={styles.title}><i className="icon-font c-mr20">&#xe605;</i>推荐歌单</span>
        <span className={styles.more}>更多</span>
      </div>
      <div className={styles._recommend}>
        {recommendPlaylist.map((item: any, key: number) => (
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
        <span className={styles.title}><i className="icon-font c-mr20">&#xe6be;</i>推荐单曲</span>
        <span className={styles.more}>更多</span>
      </div>
      <div className={styles.recommendedSong}>
        <List renderHeader={() => (`共${recommendedSong.length}首`)} className="my-list">
          {recommendedSong.map((item: any, key: number) => (
            <Item extra={(<i className="icon-font">&#xe701;</i>)} key={key} style={{height: '8vh'}}>
              <img src={`${item.picUrl}?40y40`} alt=""/>
              <span className={styles.musicName}>{item.song.name}</span>
              <span className={styles.musicAuto}>{ `\t-\t${item.song.artists[0].name}`}</span>
            </Item>
          ))}
        </List>
      </div>
      <div className={styles.lsitTitle}>
        <span className={styles.title}><i className="icon-font c-mr20">&#xe6be;</i>推荐MV</span>
        <span className={styles.more}>更多</span>
      </div>
    </div>
  )
}


export default connect()(Index)