import * as React from 'react'
import BScroll, { BsOption } from 'better-scroll'

import styles from './_styles/Scroll.module.scss'
import SvgScrollLoading from '@/assets/svg/scroll-loading.svg'

interface IProps {
  children: any;
  pullEvent: boolean;
}
const BetScroll: React.SFC<IProps> = (props) => {

  const scrollContainerRef = React.useRef(null)
  const [initScroll, setInitScroll] = React.useState<Boolean>(false)
  const [isPullDown, setIsPullDown] = React.useState<Boolean>(false)

  React.useEffect(() => {
    if(initScroll) return;
    
    const GScroll = new BScroll((scrollContainerRef.current as any), {
      pullDownRefresh: {
        threshold: 150,
        stop: 30
      },
      scrollY: true
    } as BsOption)

    GScroll.on('pullingDown', () => {
      
    })
  }, [initScroll])
  
  return(
    <div ref={scrollContainerRef} className={styles._swiper}>
      <div className={styles._main}>
        {props.children}
      </div>
      <div className={styles._headerLoading}>
        <SvgScrollLoading width={'100%'}  height={'100%'} />
      </div>
    </div>
  )
}

export default BetScroll