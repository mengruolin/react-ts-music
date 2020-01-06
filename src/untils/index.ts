
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
