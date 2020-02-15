import * as React from 'react';
import './_styles/OilLoading.scss'

import { connect } from 'react-redux'
import { globalStates } from '@/type/inedx';
import { Dispatch } from 'redux';

interface Props {
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

const mapStateToProps = (state: globalStates) => {
  return {
    showLoading: state.globalReducer.loadingGroup.globalLoaing
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OilLoading)