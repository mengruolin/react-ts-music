/**
 * 
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
 *@param time s
*/
export const adjustTime = (time: string | number): string => {

  time = Math.floor(Number(time))
  let m, s

  m = adjustTimeType(Math.floor(time / 60))
  s = adjustTimeType(Math.floor(time % 60))

  return `${m}:${s}`
}

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
