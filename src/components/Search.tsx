import * as React from 'react'
import styles from './_styles/search.module.scss'
import { SearchBar } from 'antd-mobile'
import { getHotSearchDetail, getHotSearchDefult, getSearchMultimatch } from '@/api/request'
import { getLoaclStorage, setLoaclStorage } from '@/untils'
import {connect} from "react-redux"
import { globalStates } from '@/type/inedx'
import { CHANGE_CURR_MUSIC, CHANGE_PLAY_LIST } from '@/store/actions'
import {
  getMuiscIsUse,
  getMusicDetail } from '@/api/request'
import { Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'


interface IProps {
  changeCurrMusic: (currMusic: any) => void
  changeGlobalList: (playList: any[]) => void
}


interface IProps {

}

const Search: React.SFC<IProps> = (props) => {

  const [hotSearchList, setHotSearchList] = React.useState<any[]>([]) //热搜列表
  const [searchDefault, setSearchDefault] = React.useState<string>('歌曲/歌手/歌单/专辑')  //搜索关键字
  const [historySearch, setHistorySearch] = React.useState<any[]>([]) //搜索历史，保存在localStorge中
  const [searchWorld, setSearchWorld] = React.useState<string>("")
  const [searchListFlag, setSearchListFlag] = React.useState<boolean>(false)
  const [flag, setFlag] = React.useState<boolean>(false)
  const [song,setSong] = React.useState<any[]>([])
  const [album,setAlbum] = React.useState<any[]>([])
  const [songList,setSongList] = React.useState<any[]>([])
  const [videoList, setVideoList] = React.useState<any[]>([])

  const history = useHistory()

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
  React.useEffect(() => {
    //搜索框模糊查询
    if (flag && searchWorld !== "") {
      setSearchListFlag(()=>false)
      searchMount(searchWorld)
    }
    if (searchWorld === "") {
      setSong([])
      setAlbum([])
      setSongList([])
      setSearchListFlag(()=>true)
    }
    return () => {
      setFlag(() => false)
    }
  }, [searchWorld, flag])

  const handleClickMusicItem = async (index: number) => {
    try {
      let isPlay = await getMuiscIsUse({
        id: song[index].id
      })
      if (isPlay.success) {
        let musicDetail = await getMusicDetail({
          ids: song[index].id
        })
        if (musicDetail.songs[0]) {
          props.changeCurrMusic(musicDetail.songs[0])
          props.changeGlobalList([musicDetail.songs[0]])
          window.player.play()
        } else {
          Toast.fail('歌曲播放失败！')
        }
      } else {
        Toast.fail(isPlay.message)
      }
    } catch (error) {
      Toast.fail(error)
    }
  }

  async function searchMount(searchWorld: any) {
    const searchList = await getSearchMultimatch({ keywords: searchWorld, type: 1018, limit: 100})
    if (Object.keys(searchList.result).length > 0) {
      if(searchList.result.playList){
        setSongList(()=>searchList.result.playList.playLists || [])
      }
      if(searchList.result.album){
        setAlbum(()=>searchList.result.album.albums || [])
      }
      if(searchList.result.song.songs){
        setSong(()=>searchList.result.song.songs || [])
      }
      if(searchList.result.video) {
        setVideoList(() => searchList.result.video.videos || [])
      }
    }
  }
  const getSearchChangeWorld = (value: string) => {
    setSearchWorld(value)
    setFlag(() => true)
  }

  const handleOnCancel = () => {
    setSearchWorld("")
    setFlag(() => false)
  }
  const showDetail =(item:any):any => {
    history.push("/songMenu",{id:item.id})
    var arr1 = getLoaclStorage('localSearch');
    if(arr1){
      let hasL: boolean = arr1.some((v: any) => v.id === item.id)
      !hasL && setLoaclStorage('localSearch',[...arr1, {name:item.name,id:item.id}])
    }else{
      setLoaclStorage('localSearch',[{name:item.name,id:item.id}])
    }
  } 
  const handleOnDetail = (id:any) =>{
    history.push("/songMenu",{id})
  }

  // 清空搜索历史
  const handleClearSearchHistory = () => {
    setLoaclStorage('localSearch', '')
    const localSearch = getLoaclStorage('localSearch') || []
    setHistorySearch(() => localSearch)
    Toast.success('清除成功')
  }

  const handleSelectHotSearch = (keyWord: string) => {
    setSearchWorld(keyWord)
    searchMount(keyWord)
  }
  return (
    <div className={styles._search}>
      <div className={styles.searchBox}>
        <SearchBar placeholder={searchDefault} value={searchWorld} onCancel={() => handleOnCancel()} onChange={(value) => getSearchChangeWorld(value)} />
      </div>
      {
        searchListFlag
        ? 
        <div className={styles._main}>
          {
            historySearch[0] &&
            <>
            <div className={styles.localHistory_title}>
              <span>
              搜索历史
              </span>
              <div
                className={styles.clearSearchHistory}
                onClick={handleClearSearchHistory}>
                  清空
                  <i className="icon-font c-ml20">&#xe625;</i>
              </div>
            </div>
            <div className={styles.localSearch}>
              {
                historySearch.map((item: any, key: number) => (
                <span key={item.id} onClick={()=>{handleOnDetail(item.id)}}>{item.name}</span>
                ))
              }
            </div>
            </>
          }
          <div>热搜</div>
          {hotSearchList.map((item: any, key: number) => (
            <div key={key} className={styles.hotSearchList} onClick={() => handleSelectHotSearch(item.searchWord)}>
              <span className={styles.title}>{key + 1}&nbsp;&nbsp;{item.searchWord}</span>
              {
                item.iconUrl && <img src={item.iconUrl} className={styles.icon} alt="" />
              }
              <span className={styles.count}>{item.score}</span>
            </div>
          ))}
        </div>
        :
        <div className={styles._searchList}>
          {
            song[0] &&
            song.map((item: any, index: number)=>(
              <div className={styles.song_item} key={item.id} onClick={()=>{handleClickMusicItem(index)}}>
                <i className="icon-font">&#xe60e;</i>
                <span className="c-ml20">{item.name}{'\u00A0'}-{'\u00A0'}单曲</span>
              </div>
            ))
          }
          {
            album &&
            album.map((item)=>(
            <div className={styles.album_item} key={item.id} onClick={()=>{showDetail(item)}}>
              <i className="icon-font">&#xe60a;</i>
              <span className="c-ml20">{item.name}{'\u00A0'}-{'\u00A0'}专辑</span>
            </div>
            ))
          }
          {
            songList &&
            songList.map((item)=>(
            <div className={styles.songList_item} key={item.id}  onClick={()=>{showDetail(item)}}>
              <i className="icon-font">&#xe61b;</i>
              <span className="c-ml20">{item.name}{'\u00A0'}-{'\u00A0'}歌单</span>
            </div>
            ))
          }
          {
            videoList &&
            videoList.map((item)=>(
            <div className={styles.songList_item} key={item.vid}>
              <i className="icon-font">&#xe600;</i>
              <span className="c-ml20">{item.title}{'\u00A0'}-{'\u00A0'}视频</span>
            </div>
            ))
          }
        </div>
      }

    </div>
  )
}
const mapStateToProps = (state: globalStates): {} => ({})

const mapDispatchToProps = (dispatch: any) => ({
  changeCurrMusic: (currMusic: any) => dispatch(CHANGE_CURR_MUSIC(currMusic)),
  changeGlobalList: (playList: any[]) => dispatch(CHANGE_PLAY_LIST(playList))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)