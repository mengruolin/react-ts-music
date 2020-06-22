import * as React from 'react'
import styles from './_styles/MvPlay.module.scss'
import VideoPlayer from './VideoPlayer'
import { VideoJsPlayerOptions } from 'video.js'
import { getCommentMv } from '@/api/request'
import { Toast, NavBar, Icon } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { DataFromNow } from '@/untils/index'

interface IProps {
  //sources:  {url: string, type: string | null}
  location: any
}

const MvPlay: React.SFC<IProps> = (props) => {
  const { brs, id, cover, name, desc, artistName } = props.location.state
  const scources: any[] = []
  Object.keys(brs).forEach((key: string) => scources.push({src: brs[key]}))
  const History = useHistory()

  const videoJsOptions = {
    language: 'zh',
    //sources: sourArr,
  } as VideoJsPlayerOptions

  return (
    <div className={styles._layout}>
      <NavBar
        mode="light"
        leftContent={<Icon size="md" type="left" />}
        onLeftClick={() => History.go(-1)}
      >{name} - {artistName} . mv</NavBar>
      <div className={styles.video_box}>
        <VideoPlayer videoJsOptions={videoJsOptions} cover={cover}>
          { scources[0] && <source src={scources[0].src} />}
        </VideoPlayer>
      </div>
      {
        desc !== '' &&
        <div className={styles.video_title}>
          MV介绍：{desc}
        </div>
      }
      <div className={styles.reply_box}>
        <ReplyBox id={id} />
      </div>
    </div>
  )
}

interface IPropsReply {
  id: string
}
const ReplyBox: React.SFC<IPropsReply> = (props) => {
  const [hotComments, setHotComments] = React.useState<any[]>([])
  const [comments, setComments] = React.useState<any[]>([])

  const { id } = props

  const initPage = React.useCallback(async () => {
    const res: any = await getCommentMv({id})
    if (res.code !== 200) {
      return Toast.fail('获取MV评论失败。。。')
    }
    setHotComments(res.hotComments || [])
    setComments(res.comments || [])
  }, [id])

  React.useEffect(() => {
    initPage()
  }, [initPage])


  return (
    <>
    <div className={styles.hot_reply}>
      <div className={styles.reply_title}>
        热门回复
        <i className={`icon-font c-ml20`}>&#xe62e;</i>
      </div>
      { !hotComments[0] && <div className={styles._noReply}>暂无热评</div> }
      {hotComments.map((item: any) => (
        <div className={styles.reply_item} key={item.commentId}>
          <div className={styles.userInfo_box}>
            <div className={styles.avavtarImg_box}>
              <img src={item.user.avatarUrl} alt={item.user.nickname} />
            </div>
            <span className={styles.user_name}>{item.user.nickname}</span>
            <span>{item.user.locationInfo}</span>
            <span className={styles._time}>{DataFromNow(item.time)}</span>
          </div>
          <div className={styles.context_box}>
            {item.content}
          </div>
          <div className={styles.handle_box}>
            <i className={`icon-font`}>&#xe62a;&nbsp;{item.likedCount}</i>
          </div>
        </div>
      ))}
    </div>
    <div className={styles.all_reply}>
      <div className={styles.reply_title}>
        全部回复
        <i className={`icon-font c-ml20`}>&#xe755;</i>
      </div>
      { !comments[0] && <div className={styles._noReply}>暂无评论</div> }
      {comments.map((item: any) => (
        <div className={styles.reply_item} key={item.commentId}>
          <div className={styles.userInfo_box}>
            <div className={styles.avavtarImg_box}>
              <img src={item.user.avatarUrl} alt={item.user.nickname} />
            </div>
            <span className={styles.user_name}>{item.user.nickname}</span>
            <span>{item.user.locationInfo}</span>
            <span className={styles._time}>{DataFromNow(item.time)}</span>
          </div>
          <div className={styles.context_box}>
            {item.content}
          </div>
          <div className={styles.handle_box}>
            <i className={`icon-font`}>&#xe62a;&nbsp;{item.likedCount}</i>
          </div>
        </div>
      ))}
    </div>
        
    </>
  )
}

export default MvPlay
