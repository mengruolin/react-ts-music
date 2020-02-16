export interface IGlobalReducerStates {
  loadingGroup: ILoadingGroup // 全局 Londing 集合
  locaList: any // 本地列表
  playList: any // 播放列表
  currMusicInfo: ICurrMusicInfo // 当前播放信息
}

export interface ICurrMusicInfo {
  detailInfo: any  // 
  lyric: any  // 歌词
  playState: boolean  //播放状态
}

export interface ILoadingGroup {
  globalLoaing: boolean // 全局 Loading 接口请求会调用
}

export const initState: IGlobalReducerStates = {
  loadingGroup: {
    globalLoaing: false
  },
  locaList: [],
  playList: [],
  currMusicInfo: {
    detailInfo: {},
    lyric: [[0, '暂无歌词！']],
    playState: false,
  }
}