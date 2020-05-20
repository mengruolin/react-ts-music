import * as React from 'react'
import styles from './_styles/search.module.scss'
import { SearchBar } from 'antd-mobile'
import { getHotSearchDetail, getHotSearchDefult } from '@/api/request'
import { getLoaclStorage } from '@/untils'

interface IProps {

}

const Search: React.SFC<IProps> = (props) => {

  const [hotSearchList, setHotSearchList] = React.useState<any[]>([]) //热搜列表
  const [searchDefault, setSearchDefault] = React.useState<string>('歌曲/歌手/歌单/专辑')  //搜索关键字
  const [historySearch, setHistorySearch] = React.useState<any[]>([]) //搜索历史，保存在localStorge中

  // 初始化Hook
  React.useEffect(() => {
    mounted()
  }, [])

  const mounted = async () => {
    //默认搜索关键字
    const defaultWrold = await getHotSearchDefult()
    setSearchDefault((pre) => defaultWrold.data.realkeyword || pre)

    //热搜列表
    const hotList = await getHotSearchDetail()
    setHotSearchList(() => hotList.data || [])

    //本地搜索历史
    const localSearch = getLoaclStorage('localSearch') || []
    setHistorySearch(() => localSearch)
  } 

  return(
    <div className={styles._search}>
      <div className={styles.searchBox}>
        <SearchBar placeholder={searchDefault} maxLength={8} />
      </div>
      <div className={styles._main}>
        <div>搜索历史</div>
        <div className={styles.localSearch}>
          {
            historySearch.map((item: any, key: number) => (
              <span key={key}>33</span>
            ))
          }
        </div>
        <div>热搜</div>
        {hotSearchList.map((item: any, key: number) => (
          <div key={key} className={styles.hotSearchList}>
            <span className={styles.title}>{key+1}&nbsp;&nbsp;{item.searchWord}</span>
            {
              item.iconUrl && <img src={item.iconUrl} className={styles.icon} alt=""/>
            }
            <span className={styles.count}>{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search