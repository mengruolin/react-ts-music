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
          {props.caruseInfo.map((item: any, key: number) => (
            <a
            key={key}
            href={item.url === '' ? '/' : item.url}
            style={{
              display: 'block',
              position: 'relative',
              boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
            }}>
              <img
                src={`${item.picUrl}?600y400`}
                alt=""
                style={{ width: '100%',height: '30vh', verticalAlign: 'top'}}
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