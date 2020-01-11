import * as React from 'react'
import { Carousel } from 'antd-mobile'


interface IProps {
  caruseInfo: any
}

const Caruse: React.SFC<IProps> = (props: IProps) => {

  const [curr, setCurr] = React.useState<number>(0)

  const afterChange = (curr: number): void => {
    
  }

  const beforeChange = (from: number, to: number): void => {
    setCurr(to)
  }

  return(
    <>
      <Carousel
          autoplay
          infinite
          beforeChange={beforeChange}
          afterChange={afterChange}
          style={{height: '100%', overflow: 'hidden', borderRadius: '4vw' }}
          dots={false}
        >
          {props.caruseInfo.map((val: any, key: number) => (
            <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: 'block',
              position: 'relative',
              boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
            }}
          >
              <img
                src={`https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1578709341&di=660739f367c8444aa8b2b8a8cb18a835&src=http://pic1.win4000.com/wallpaper/2018-01-16/5a5dc79aa397c.jpg`}
                alt=""
                style={{ width: '100%',height: '100%', verticalAlign: 'top'}}
              />
            </a>
          ))}
        </Carousel>
    </>
  )
}

export default Caruse


const styles: any = {
  currImg: {
    marginTop: '2vh'
  }
}