import http from './http'
import {
  Api_artistList,
  Api_likelist,
  Api_playlistDetail
} from './types'

export const createRequest = (methods: string, api: string) => {
  return async (params: any) => {
    let res = (http as any)[methods](api, params)
    return res
  }
}

export const getArtList = createRequest('get', Api_artistList)

export const getLikeList = createRequest('get', Api_likelist)

export const getPlaylistDetail = createRequest('get', Api_playlistDetail)