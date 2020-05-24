import { IGetMusicInfo, IRemoveListenType } from "./types/info"

export interface playListI {
  name: string
  tracks: string
  id: string
  sourceList?: playListI[]
}

export default class Mp3 {
  constructor(id?: string, playList?: playListI[]) {
    this.id = id || '2'
    // this.playList = playList || this.defaultList
  }

  readonly defaultList = [{
    name: 'default',
    tracks: '',
    id: '1351219081'
  }]

  public id: string = ''
  public player = null as unknown as HTMLAudioElement
  private playMode: string = 'random' //  order 顺序  random 随机 single 单曲循环
  private modeList = ['order', 'random', 'single']
  private playList: playListI[] = []
  private buffer: boolean = false
  private inMusic: number = 0
  private keepPlay: boolean = false
  private musicTitle: string = 'https://music.163.com/song/media/outer/url?id='

  private readlyEventCallback: Function[] = []
  private timeUpdataEventCallback: Function[] = []


  //
  //
  //get Fn
  public get musicList(): playListI[] {
    return this.playList
  }

  public get indexNum(): number {
    return this.inMusic
  }

  public get paused(): boolean {
    return this.player.paused
  } 

  /**
   * 
   */
  public get getMusicInfo(): IGetMusicInfo {
    let duration, index, currentTime

    duration = this.player.duration
    index = this.inMusic
    currentTime = this.player.currentTime

    return {
      duration,
      currentTime,
      index
    }
  }

  public get getPlayMode(): number {
    return this.modeList.indexOf(this.playMode)
  }

  /**
   * init method
   * 
   * @param config 
   * @param playList 
   */
  public init(config?: object, playList?: playListI[]) {
    this.playList = playList || []

    this.player = document.getElementById(this.id) as HTMLAudioElement
    
    if (this.playList[0]) {
      this.player.src = this.playList[this.inMusic].id
    }
    this.player.addEventListener("canplaythrough", (event) => {
      this.buffer = true
      this.keepPlay && this.player.play()

      this.readlyEventCallback.forEach((fn: any) => {
        fn(this.getMusicInfo)
      })
    })

    this.player.addEventListener('timeupdate', (event) => {
      this.timeUpdataEventCallback.forEach((fn => {
        fn(this.getMusicInfo)
      }))
    })

    this.player.addEventListener('ended', () => {
      this.buffer = false
      this.evLoop()
    })

    this.player.addEventListener('error', (err) => {
      this.nextMusic()
    })
  }

  //
  //
  //  play about

  public play(): void {
    if (this.buffer) {
      this.player.play()
      this.keepPlay = true
    } else {
      /* throw new Error('歌曲未缓冲完成') */
    }
  }

  public pause(): void {
    this.player.pause()
    // this.keepPlay = false
  }

  public prevMusic(): void {
    if (this.playMode === 'order') {
      if (this.inMusic === 0) {
        this.inMusic = this.playList.length
      }

      this.player.src = this.musicTitle + this.playList[++this.inMusic].id

      this.play()
    } else {
      this.evLoop()
    }
  }

  public nextMusic(): void {
    if (this.playMode === 'order') {
      if (this.inMusic === this.playList.length - 1) {
        this.inMusic = -1
      }

      this.player.src = this.musicTitle + this.playList[++this.inMusic].id

      this.play()
    } else {
      this.evLoop()
    }

  }

  private evLoop(): void {
    switch (this.playMode) {
      case 'single':
        this.singlePlay()
        break
      case 'random':
        this.randomPlay()
        break
      case 'order':
        this.orderPlay()
        break
    }
  }

  private singlePlay(): void {
    this.player.play()
  }

  private randomPlay() {
    if (this.playList.length === 1) {
      return this.player.play()
    }
    
    let randomNum = Math.floor(Math.random() * this.playList.length)
    while (randomNum === this.inMusic) {
      randomNum = Math.floor(Math.random() * this.playList.length)
    }

    this.inMusic = randomNum
    this.player.src = this.musicTitle + this.playList[this.inMusic].id
  }

  private orderPlay(): void {

    this.nextMusic()
  }

  public setPlayMode(state?: number): void {
    //order 顺序  random 随机 single 单曲循环
    state = this.modeList.indexOf(this.playMode)
    state++
    if(state === this.modeList.length) state = 0

    this.playMode = this.modeList[state]
  }

  public setPlayMusic(index: number): void {
    this.inMusic = index
    this.play()
  }

  // playList methods
  //
  //
  public addMusic(music: playListI): void {
    this.playList.push(music)
  }

  public replaceMusicList(musicList: playListI[]): void {
    this.playList = musicList

    let num = Math.floor(Math.random() * this.playList.length)

    this.inMusic = num

    this.player.src = this.musicTitle + this.playList[this.inMusic].id
  }


  //
  //
  //  Event

  public on(type: string, callback: Function): IRemoveListenType {
    let cbData
    switch (type) {
      case 'readly':
        cbData = this.addReadlyEvent(callback)
        break
      case 'timeupdate':
        cbData = this.addTimeupdateEvent(callback)
    }

    return cbData as IRemoveListenType
  }

  public remove(eventInfo: IRemoveListenType): void {
    switch (eventInfo.type) {
      case 'readly':
        //cbData = this.addReadlyEvent(callback)
        this.readlyEventCallback.splice(eventInfo.index, 1)
        break
      case 'timeupdate':
        //cbData = this.addTimeupdateEvent(callback)
        this.timeUpdataEventCallback.splice(eventInfo.index, 1)
        break
    }
  }
  
  private addReadlyEvent(fn: Function): IRemoveListenType {
    
    this.readlyEventCallback.push(fn)
    return {
      type: 'readly',
      index: this.readlyEventCallback.length - 1
    }
  }

  public addTimeupdateEvent(fn: Function): IRemoveListenType {
    this.timeUpdataEventCallback.push(fn)
    return {
      type: 'timeupdate',
      index: this.timeUpdataEventCallback.length - 1
    }
  }
}