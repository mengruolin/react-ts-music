import * as React from 'react'
import styles from './_styles/search.module.scss'
import { SearchBar } from 'antd-mobile'
import { getHotSearchDetail, getHotSearchDefult } from '@/api/request'

interface IProps {

}

const Search: React.SFC<IProps> = (props) => {

  const [hotSearchList, setHotSearchList] = React.useState<any[]>([])
  const [searchDefault, setSearchDefault] = React.useState<string>('歌曲/歌手/歌单/专辑')

  React.useEffect(() => {
    mounted()
  }, [])

  const mounted = async () => {
    let defaultWrold = await getHotSearchDefult()
    
    setSearchDefault((pre) => defaultWrold.data.realkeyword || pre)

    let hotList = await getHotSearchDetail()
    setHotSearchList(() => hotList.data || [])
    
  } 

  return(
    <div className={styles._search}>
      <div className={styles.searchBox}>
        <SearchBar placeholder={searchDefault} maxLength={8} />
      </div>
      <div className={styles._main}>
        {hotSearchList.map((item: any, key: number) => (
          <div key={key} className={styles.hotSearchList}>
            <span className={styles.title}>{key+1}&nbsp;&nbsp;{item.searchWord}</span>
            {item.iconUrl?
              <img src={item.iconUrl} className={styles.icon} alt=""/>
              :
              <></>
            }

            <span className={styles.count}>{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search