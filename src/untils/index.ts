import moment from 'moment'


/**
 * 歌词播放时间解析
 * @param text 
*/
export function parseLyric(text: string) {
  const lyric = text.split('\n');
  let lrc: any = []; 
  let sj: any, _lrc: string, min, sec, ms, _t

  lyric.forEach((item) => {
    sj = item.match(/\[\d{2}:\d{2}.\d{2,3}\]/g)

    _lrc = item.replace(/\[\d{2}:\d{2}.\d{2,3}\]/g, '')

    //console.log(sj[0]);
    if (sj) {
      sj.forEach((sjs: any) => {
        min = Number(sjs.match(/\d{2}/g)[0])
        sec = Number(sjs.match(/\d{2}/g)[1])
        ms = Number(sjs.match(/\d{2}/g)[2])
        _t = (min * 60 * 1000) + (sec * 1000) + ms

        lrc.push([_t, _lrc]);
      })
    }
  })

  lrc = lrc.filter((item: any) => item[1])
  
  return lrc;
}


/***
 * 格式化时间
 *@param time
*/
export const adjustTime = (time: string | number): string => {

  time = Math.floor(Number(time))
  let m, s

  m = adjustTimeType(Math.floor(time / 60))
  s = adjustTimeType(Math.floor(time % 60))

  return `${m}:${s}`
}

/**
 * 格式化时间
 * @param m 秒
 */
const adjustTimeType = (m: number | string) => {
  switch (String(m).length) {
    case 0:
      m = '00'
      break
    case 1:
      m = '0' + m
      break
    default:
      m = m + ''
  }

  return m
}

/**
 * 格式化播放数量
 * @param count 播放数量
 */
export const getCNParseInt = (count: string | number): string => {
  const intCount = parseInt(String(count))
  const strCount = intCount.toString()

  if(strCount.length < 4) {
    count = intCount + ''
    return count
  } else if(strCount.length < 9) {
    count = (intCount / 10000).toFixed(2) + '万'
    return count
  } else {
    count = (intCount / 100000000).toFixed(2) + '亿'
    return count
  }
}

/**
 * 获取 localStorge 中的值
 * @param key localStorge Key 值
 */
export const getLoaclStorage = (key: string): any => {
  return !window.localStorage.getItem(key) ? null 
    : JSON.parse(window.localStorage.getItem(key) as string)
}

/**
 * 存储 localStorge 中的值
 * @param key localStorge Key 值
 *        val localStorge value
 */
export const setLoaclStorage = (key: string, val: any): void => {
  const preData: any = getLoaclStorage(key)

  if (!preData) {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    window.localStorage.setItem(key, JSON.stringify(val))
  }
}


// Moment
export const DataFromNow = (Date: Date): string => {
  moment.locale('zh-cn')
  return moment(Date).fromNow()
}
