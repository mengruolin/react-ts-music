import * as React from 'react'
import '../_styles/de-header.scss'

interface props {
}

interface state {
  readonly color: string;
}

export default class MyHeader extends React.Component<props, state> {
  constructor(props: Readonly<{}>) {
    super(props)

    this.state = {
      color: '',
    }
  }

  render() {
    return(
      <div className="_de-header"></div>
    )
  }
}
