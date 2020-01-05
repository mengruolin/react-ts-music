import * as React from 'react';
import './_styles/OilLoading.scss'

interface Props {
  show: boolean;
}

const OilLoading: React.SFC<Props> = (props: Props) => {
  
  //console.log(props.show);
  
  return(
    <>
      {props.show ? (
        <div className="_loading-swiper">
          <div className="_OilLoading"/>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default OilLoading