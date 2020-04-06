export interface IGlobalReducerStates {
  loadingGroup: ILoadingGroup // 全局 Londing 集合
  localDB: ILocalDB // 本地存储
  playList: any // 播放列表
  currMusicInfo: ICurrMusicInfo // 当前播放信息
}

export interface ICurrMusicInfo {
  detailInfo: any  // 
  lyric: any  // 歌词
  playState: boolean  //播放状态
  playMethods: string // 播放模式
  isLove: boolean //收藏状态
}

export interface ILoadingGroup {
  globalLoaing: boolean // 全局 Loading 接口请求会调用
}

export interface ILocalDB {
  localMusicList: any // 本地列表
  localMusicIds: number[]
}

export const initState: IGlobalReducerStates = {
  loadingGroup: {
    globalLoaing: false
  },
  localDB: {
    localMusicList: [],
    localMusicIds: [],
  },
  playList: [],
  currMusicInfo: {
    detailInfo: {},
    lyric: [[0, '暂无歌词！']],
    playState: false,
    playMethods: 'random',
    isLove: false,
  }
}