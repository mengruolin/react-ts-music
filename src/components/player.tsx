import React, { Component } from 'react';
import Mp3 from '../plugins/Mp3'
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
        url: 'https://music.163.com/song/media/outer/url?id=1412263970',
        tracks: '',
        name: ''
      }
    }
  }

  componentDidMount() {
    const player = new Mp3('globalAudio')
    window.player = player

    player.init()
  }

  render () {
    return (
      <>
        <audio id="globalAudio"></audio>
      </>
    )
  }
}

interface playListI {
  name?: string;
  tracks?: string;
  url?: string;
}
