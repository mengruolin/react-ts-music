import React, { Component } from 'react';
declare var window: any

export interface Props {
  children?: React.ReactNode;
}

interface State {
  nowPlay: playListI;
}

export default class Player extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props)
    this.state = {
      nowPlay: {
        id: '',
        tracks: '',
        name: ''
      }
    }
  }

  componentDidMount() {
    const player = new Mp3('globalAudio')
    window.player = player

    player.init()
    this.setState({nowPlay: player.nowPlay})

  }

  render () {
    return (
      <>
        <audio id="globalAudio" src={`https://music.163.com/song/media/outer/url?id=${this.state.nowPlay.id}`}></audio>
      </>
    )
  }
}

// const Player: React.FC<Props> = (props) => {
//   let player
//   const [nowPlay, setNowPlay] = useState({
//     name: '',
//     tracks: '',
//     id: ''
//   })

//   useEffect(() => {
//     player = new Mp3('globalAudio')
//     window.player = player
//     player.init()
//   })


//   return(
//     <>
//       <audio id="globalAudio" src={`https://music.163.com/song/media/outer/url?id=${nowPlay.id}`}></audio>
//     </>
//   )
// }

// export default Player

interface playListI {
  name?: string;
  tracks?: string;
  id?: string;
}

class Mp3 {
  constructor(id: string) {
    this.player = document.getElementById(id)
  }

  public playMode: string = 'single' //  order 顺序  random 随机 single 单曲循环
  public playList: playListI[] = [{}]
  public nowPlay: playListI = {
    name: 'road',
    tracks: '2400',
    id: '1351219081'
  }
  public index: number = 0
  private player: any = null

  

  public init() {
    console.log('player alery init...');
    // this.player.play()
  }

  public play() {
    
    this.player.play()

    this.player.addEventListener('ended', () => {
      this.evLoop()
    })
  }

  private evLoop() {
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

  private singlePlay() {
    this.player.play()
  }

  private randomPlay() {
    let ln = this.playList.length
    this.index = Math.floor(Math.random() * ln)

  }

  private orderPlay() {
    
  }
}
