import * as React from 'react'
import { Carousel } from 'antd-mobile'


interface IProps {
  caruseInfo: any
}

const Caruse: React.SFC<IProps> = (props: IProps) => {

  return(
    <>
      <Carousel
        autoplay
        infinite
        dots={false}
        style={{overflow: 'hidden', borderRadius: '2vw'}}>
        {props.caruseInfo.map((item: any, key: number) => (
          <a
            key={key}
            href='https://github.com/mengruolin/react-ts-music'
            style={{ display: 'inline-block', width: '100%', height: '25vh', touchAction: 'pan-y'}}>
            <img
              alt=""
              style={{ width: '100%',height: '26vh', verticalAlign: 'top'}}
              src={`${item.pic}?600y240`}
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