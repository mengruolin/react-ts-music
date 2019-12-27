import * as React from 'react'
import { NavBar, Icon } from 'antd-mobile';

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
      <>
        <NavBar
          mode="dark"
          leftContent="Music"
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >NavBar</NavBar>
      </>
    )
  }
}
