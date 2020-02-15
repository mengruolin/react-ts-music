export interface IGlobalReducerStates {
  count: number
  loadingGroup: ILoadingGroup
  playList: any
  currMusicInfo: ICurrMusicInfo
}

interface ICurrMusicInfo {
  lyric: any
}

export interface ILoadingGroup {
  globalLoaing: boolean
}

export const initState: IGlobalReducerStates = {
  count: 0,
  loadingGroup: {
    globalLoaing: false
  },
  playList: {},
  currMusicInfo: {
    lyric: {}
  }
}