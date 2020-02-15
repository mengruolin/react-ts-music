import {
  SETLOADING,
  SETLOADING_TYPE,
  SETPLAYLIST,
  SETPLAYLIST_TYPE
} from '../const'

import {
  getPlaylistDetail
} from '@/api/request'

import { Dispatch } from 'redux'

export interface ISETLOADINGAction {
  type: SETLOADING_TYPE
  payload: {
    key: string
    loading: boolean
  }
}

export interface ISETPLAYLISTAction {
  type: SETPLAYLIST_TYPE
  list: any
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = ISETLOADINGAction | ISETPLAYLISTAction

export const setLoading = (scope: string, loading: boolean): ISETLOADINGAction => ({
  type: SETLOADING,
  payload: {
    key: scope,
    loading
  }
})

// 
export const getMusicListAction = (params: any) => (dispath: Dispatch) => {
  getPlaylistDetail(params)
  .then(res => {
    //dispath(setLoading('globalLoaing', false))
    if (res.code === 200) {
      dispath(CHANGE_PLAY_LIST(res))
    }
  })
}

const CHANGE_PLAY_LIST = (list: any): ISETPLAYLISTAction => ({
  type: SETPLAYLIST,
  list
})
