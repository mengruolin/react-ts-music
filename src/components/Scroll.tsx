import * as React from 'react'
import BScroll from 'better-scroll'

import styles from './_styles/Scroll.module.scss'

interface IProps {
  children: any;
  startX?: number;
  startY?: number;
  scrollX?: boolean;
  scrollY?: boolean;
  freeScroll?: boolean;
  directionLockThreshold?: number;
  eventPassthrough?: string | boolean;
  click?: boolean;
  // dblclick: boolean | DoubleClick;
  tap?: boolean;
  bounce?: boolean;
  bounceTime?: number;
  momentum?: boolean;
  momentumLimitTime?: number;
  momentumLimitDistance?: number;
  swipeTime?: number;
  swipeBounceTime?: number;
  deceleration?: number;
  flickLimitTime?: number;
  flickLimitDistance?: number;
  resizePolling?: number;
  probeType?: number;
  preventDefault?: boolean;
  preventDefaultException?: object;
  HWCompositing?: boolean;
  useTransition?: boolean;
  useTransform?: boolean;
  bindToWrapper?: boolean;
  disableMouse?: boolean;
  disableTouch?: boolean;
  // observeDOM?: boolean;
  // autoBlur?: boolean;
  // stopPropagation?: boolean;
}
const BetScroll: React.SFC<IProps> = (props) => {

  const scrollContainerRef = React.useRef(null)
  React.useEffect(() => {
    const scroll = new BScroll((scrollContainerRef.current as any), {
      pullDownRefresh: true,
      scrollY: true
    })
  }, [])
  
  return(
    <div ref={scrollContainerRef} className={styles._swiper}>
      {props.children}
    </div>
  )
}

export default BetScroll