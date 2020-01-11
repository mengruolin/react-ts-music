import { IGetMusicInfo } from "./types/info"

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
  public playMode: string = 'random' //  order 顺序  random 随机 single 单曲循环
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

  /**
   * init method
   * 
   * @param config 
   * @param playList 
   */
  public init(config?: object, playList?: playListI[]) {
    this.playList = playList || []

    this.player = document.getElementById(this.id) as HTMLAudioElement
    
    this.player.src = this.playList[this.inMusic].id

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

  private randomPlay(): void {

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

  public on(type: string, callback: Function): void {
    switch (type) {
      case 'readly':
        this.addReadlyEvent(callback)
        break
      case 'timeupdate':
        this.addTimeupdateEvent(callback)
    }
  }
  
  private addReadlyEvent(fn: Function): void {
    this.readlyEventCallback.push(fn)
  }

  public addTimeupdateEvent(fn: Function): void {
    this.timeUpdataEventCallback.push(fn)
  }
}