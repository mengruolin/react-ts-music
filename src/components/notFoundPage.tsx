import * as React from 'react'
import styles from './_styles/notFoundPage.module.scss'
import { useHistory } from 'react-router-dom'
import SvgNotFound from '@/assets/svg/notFound.svg'
import { Button } from 'antd-mobile'

interface IProps {}

const NotFoundPage: React.SFC<IProps> = (props) => {
  const History = useHistory()
  return (
    <div className={styles._layout}>
      <div className={styles.svg_icon}>
        <SvgNotFound width={'100%'} height={'100%'} />
      </div>
      <div className={styles._btn}>
        <h3>页面消失了...</h3>
        <Button icon="check-circle-o" type="ghost" size="small" inline onClick={() => History.push('/')}>回到首页</Button>
      </div>
    </div>
  )

}

export default NotFoundPage