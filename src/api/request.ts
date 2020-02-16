import http from './http'
import {
  Api_artistList,
  Api_likelist,
  Api_playlistDetail,
  Api_lyric,
  Api_personalized,
  Api_personalizedNewsong,
  Api_personalizedPrivatecontent,
  Api_banner,
  Api_personalizedMv,
  Api_toplistDetail,
  Api_checkMusic,
  Api_songDetail,
} from './types'

export const createRequest = (methods: string, api: string) => {
  return async (params?: any) => {
    let res = (http as any)[methods](api, params)
    return res
  }
}

export const getArtList = createRequest('get', Api_artistList)

export const getLikeList = createRequest('get', Api_likelist)

export const getPlaylistDetail = createRequest('getl', Api_playlistDetail)

export const getLyric = createRequest('get', Api_lyric)

export const getPersonalized = createRequest('get', Api_personalized)

export const getPersonalizedNewsong = createRequest('get', Api_personalizedNewsong)

export const getPersonalizedPrivatecontent = createRequest('get', Api_personalizedPrivatecontent)

export const getBanner = createRequest('get', Api_banner) //轮播图

export const getPersonalizedMv = createRequest('get',  Api_personalizedMv)  //推荐,MV

export const getToplistDetail = createRequest('get', Api_toplistDetail) //所有榜单内容摘要

export const getMuiscIsUse = createRequest('get', Api_checkMusic) //歌曲是否可播放

export const getMusicDetail = createRequest('getl', Api_songDetail) //歌曲详情
