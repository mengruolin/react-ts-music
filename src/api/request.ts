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
  Api_searchHotdetail,
  Api_searchDefault,
  Api_search,
  Api_MvDetail,
  Api_commentMv,
} from './types'

export const createRequest = (methods: string, api: string) => {
  return async (params?: any) => {
    let res = (http as any)[methods](api, params)
    return res
  }
}
// 接口功能注释同 type.ts 文件

export const getArtList = createRequest('get', Api_artistList)

export const getLikeList = createRequest('get', Api_likelist)

export const getPlaylistDetail = createRequest('getl', Api_playlistDetail)

export const getLyric = createRequest('get', Api_lyric)

export const getPersonalized = createRequest('get', Api_personalized)

export const getPersonalizedNewsong = createRequest('get', Api_personalizedNewsong)

export const getPersonalizedPrivatecontent = createRequest('get', Api_personalizedPrivatecontent)

export const getBanner = createRequest('get', Api_banner) //轮播图

export const getPersonalizedMv = createRequest('get',  Api_personalizedMv)  //推荐,MV

export const getToplistDetail = createRequest('getl', Api_toplistDetail) //所有榜单内容摘要

export const getMuiscIsUse = createRequest('get', Api_checkMusic) //歌曲是否可播放

export const getMusicDetail = createRequest('getl', Api_songDetail) //歌曲详情

export const getHotSearchDefult = createRequest('get', Api_searchDefault)

export const getHotSearchDetail = createRequest('get', Api_searchHotdetail) //热搜详情

export const getSearchMultimatch = createRequest('get',Api_search)//搜索关键字

export const getMvDetail = createRequest('get', Api_MvDetail) //获取 mv 数据

export const getCommentMv = (params: {
  id: string, limit?: number, offset?: number, before?: number}) => createRequest('get', Api_commentMv)(params)
