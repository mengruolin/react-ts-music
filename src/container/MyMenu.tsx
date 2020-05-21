import * as React from 'react'
import styles from './_styles/MyMenu.module.scss'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { globalStates } from '@/type/inedx'
import { List } from 'antd-mobile'

interface IProps {
  myLoveList: any[]
}

const MyMenu: React.SFC<IProps> = (props) => {
  const history = useHistory()
  const Item = List.Item
  const { myLoveList } = props

  return (
    <div className={styles._myMenu}>
      <div className={styles.header}>
        <i className={`${styles.goBack} icon-font`} onClick={() => history.go(-1)}>&#xe716;</i>
      </div>
      <div className={styles.cover}>
        {myLoveList[0] && <img src={`${myLoveList[0].al.picUrl}?param=600y300`} alt=""/>}
      </div>
      <div className={styles.songsList}>
        <List renderHeader={() => (`共${myLoveList.length}首`)} className="my-list">
              { myLoveList[0] && myLoveList.map((item: any, key: number) => (
                  <Item extra={(<i className="icon-font">&#xe701;</i>)} key={key} style={{height: '8vh'}}>
                    <span className={styles.musicName}>{item.name}</span>
                    <span className={styles.musicAuto}>{`\t-\t${item.ar[0].name}`}</span></Item>)
                )}
            </List>
      </div>
    </div>
  )
}

const mapStateToProps = (state: globalStates): {myLoveList: []} => ({
  myLoveList: state.globalReducer.localDB.localMusicList
})

const mapDispatchToProps = (dispatch: any) => ({})

export default  connect(mapStateToProps, mapDispatchToProps)(MyMenu)
