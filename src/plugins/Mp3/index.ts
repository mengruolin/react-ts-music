export interface playListI {
  name: string
  tracks: string
  url: string
  sourceList?: playListI[]
}

export default class Mp3 {
  constructor(id?: string, playList?: playListI[]) {
    this.id = id || '2'
    this.playList = playList || this.defaultList
  }

  readonly defaultList = [{
    name: 'default',
    tracks: '',
    url: 'https://music.163.com/song/media/outer/url?id=536018'
  },
  {
    name: 'default',
    tracks: '',
    url: 'https://music.163.com/song/media/outer/url?id=22761030'
  },
  {
    name: 'default',
    tracks: '',
    url: 'https://music.163.com/song/media/outer/url?id=29792560'
  }]

  public id: string = ''
  public player = null as unknown as HTMLAudioElement
  public playMode: string = 'random' //  order 顺序  random 随机 single 单曲循环
  private playList: playListI[] = []
  private buffer: boolean = false
  private inMusic: number = 0
  private nextPlay: boolean = false


  public init(config?: object) {

    this.player = document.getElementById(this.id) as HTMLAudioElement
    
    this.player.src = this.playList[this.inMusic].url

    this.player.addEventListener("canplaythrough", (event) => {
      console.log('buffer is true')
      
      this.buffer = true

      if (this.nextPlay) {
        this.player.play()
      }
    });

    this.player.addEventListener('ended', () => {
      console.log('buffer is false')

      this.buffer = false;
      this.evLoop()
    })
  }

  

  public play() {
    if (this.buffer) {
      this.player.play()
    } else {
      throw new Error('歌曲未缓冲完成')
    }
  }

  public get musicList(): playListI[] {
    return this.playList
  }

  public get indexNum(): number {
    return this.inMusic
  }

  public addMusic(music: playListI): void {
    this.playList.push(music)
  }

  public replaceMusicList(musicList: playListI[]): void {
    this.playList = musicList
  }

  public lastMusic(): void {
    if (this.inMusic === 0) {
      this.inMusic = this.playList.length
    }

    this.player.src = this.playList[++this.inMusic].url
  }

  public nextMusic(): void {
    if (this.inMusic === this.playList.length - 1) {
      this.inMusic = -1
    }

    this.player.src = this.playList[++this.inMusic].url
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
    // this.player.src = this.playList[1].url
    this.player.play()
  }

  private randomPlay(): void {

    let randomNum = Math.floor(Math.random() * this.playList.length)
    while (randomNum === this.inMusic) {
      randomNum = Math.floor(Math.random() * this.playList.length)
    }

    this.inMusic = randomNum
    this.nextPlay = true
    this.player.src = this.playList[this.inMusic].url
  }

  private orderPlay(): void {

    this.nextMusic()
  }
}