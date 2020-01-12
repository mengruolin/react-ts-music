import http from './http'
import {
  Api_artistList,
  Api_likelist,
  Api_playlistDetail,
  Api_lyric,
  Api_personalized,
  Api_personalizedNewsong,
  Api_personalizedPrivatecontent,
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

export const getLyric = createRequest('getl', Api_lyric)

export const getPersonalized = createRequest('get', Api_personalized)

export const getPersonalizedNewsong = createRequest('get', Api_personalizedNewsong)

export const getPersonalizedPrivatecontent = createRequest('get', Api_personalizedPrivatecontent)