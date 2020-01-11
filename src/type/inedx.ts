export type StoreState = number

export interface IStates {
  count: number
  loadingGroup: ILoadingGroup
  playList: any
}

export interface ILoadingGroup {
  globalLoaing: boolean
}

export const initState: IStates = {
  count: 0,
  loadingGroup: {
    globalLoaing: false
  },
  playList: {}
}

