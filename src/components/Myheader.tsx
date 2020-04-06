import * as React from 'react'

import styles from './_styles/header.module.scss'
import SvgLogo from '@/assets/svg/header-logo.svg'
import { useHistory } from 'react-router-dom'

interface IProps {}

const MyHeader: React.SFC<IProps> = (props) => {

  const history = useHistory()
  return(
    <div className={styles._header}>
      <div className={styles.logo}>
        <SvgLogo width={'100%'} height={'100%'} />
      </div>
      <div className={styles.navList}>
        <span>首页</span>
        <span>发现</span>
        <span>商城</span>
      </div>
      <div className={styles.search} onClick={() => history.push('/search')}>
        <i className="icon-font">&#xe64c;</i>
      </div>
    </div>
  )
}

export default MyHeader