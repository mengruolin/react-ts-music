import {
  SETLOADING,
  SETLOADING_TYPE,
  SETPLAYLIST,
  SETPLAYLIST_TYPE,
  SET_PLAY_LYRIC,
  SET_PLAY_LYRIC_TYPE,
  SET_PLAY_MUSIC_TYPE,
  SET_PLAY_MUSIC,
  SET_LOCAL_MUSIC_TYPE,
  SET_LOCAL_MUSIC,
  SET_PLAY_MUSIC_LOVE_TYPE,
  SET_PLAY_MUSIC_LOVE
} from '../const'

import {
  getPlaylistDetail, getLyric
} from '@/api/request'

import { Dispatch } from 'redux'
import { parseLyric } from '@/untils'

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

export interface ISETPLAYLYRICAction {
  type: SET_PLAY_LYRIC_TYPE
  lyric: any
}

export interface ISETPLAYMUSICAction {
  type: SET_PLAY_MUSIC_TYPE
  currMusic: any
}

export interface ISETLOCALMUSICAction {
  type: SET_LOCAL_MUSIC_TYPE
  musicList: any[]
  musicIds: any[]
}

export interface ISETPLAYMUSICLOVEAction {
  type: SET_PLAY_MUSIC_LOVE_TYPE
  state: boolean
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = ISETLOADINGAction | ISETPLAYLISTAction | ISETPLAYLYRICAction | ISETPLAYMUSICAction
  | ISETLOCALMUSICAction | ISETPLAYMUSICLOVEAction

export const setLoading = (scope: string, loading: boolean): ISETLOADINGAction => ({
  type: SETLOADING,
  payload: {
    key: scope,
    loading
  }
})

// 保存全局list
export const CHANGE_PLAY_LIST = (list: any): ISETPLAYLISTAction => ({
  type: SETPLAYLIST,
  list
})

// 获取歌单 保存进全局 List
export const getMusicListAction = (params: any) => (dispath: Dispatch) => {
  getPlaylistDetail(params)
  .then(res => {
    //dispath(setLoading('globalLoaing', false))
    if (res.code === 200 && res.playlist.tracks) {
      //console.log(res);
      dispath(CHANGE_PLAY_LIST(res.playlist.tracks))
    }
  })
}

// 保存当前播放歌词信息
export const CHANGE_PLAY_LYRIC = (lyric: any): ISETPLAYLYRICAction => ({
  type: SET_PLAY_LYRIC,
  lyric
})

export const CHANGE_CURR_MUSIC = (currMusic: any): ISETPLAYMUSICAction => ({
  type: SET_PLAY_MUSIC,
  currMusic
})

export const changeMusicInfoAction = (currMusic: any) => (dispath: Dispatch) => {
  // 改变当前音乐详情
  dispath(CHANGE_CURR_MUSIC(currMusic))
  
  // 查询歌词
  getLyric({id: currMusic.id})
    .then( res => {
      if( res.code === 200 && res.lrc ) {
        dispath(CHANGE_PLAY_LYRIC(parseLyric(res.lrc.lyric)))
      } else {
        dispath(CHANGE_PLAY_LYRIC([[0, '暂无歌词！']]))
      }
    })
}

// 读取本地音乐
export const CHANGE_LOCAL_MUSIC = (musicList: any[], musicIds: any[]): ISETLOCALMUSICAction => ({
  type: SET_LOCAL_MUSIC,
  musicList,
  musicIds
})

// 改变当前播放音乐收藏状态
export const CHANGE_PLAY_MUSIC_LOVE = (state: boolean): ISETPLAYMUSICLOVEAction => ({
  type: SET_PLAY_MUSIC_LOVE,
  state
})
