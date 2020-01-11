import * as React from 'react';
import './_styles/OilLoading.scss'

import { connect } from 'react-redux'
import { IStates } from '@/type/inedx';
import { Dispatch } from 'redux';
import { decrement } from '@/store/actions';

interface Props {
  onDecrement: () => void
  showLoading: boolean
}

const OilLoading: React.SFC<Props> = (props: Props) => {
  
  return(
    <>
      {props.showLoading ? (
        <div className="_loading-swiper">
          <div className="_OilLoading"/>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

const mapStateToProps = (state: IStates) => {
  return {
    showLoading: state.loadingGroup.globalLoaing
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDecrement: () => dispatch(decrement())
})

export default connect(mapStateToProps, mapDispatchToProps)(OilLoading)