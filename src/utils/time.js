export function formatTime (dateString, fmt = 'yyyy-MM-dd hh:mm') {
  const date = new Date(parseInt(dateString))
  let o = {
    'M+': parseInt(date.getMonth()) + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function getTimeFromSeconds (seconds) {
  seconds = formatType(Math.ceil(seconds / 1000))
  const h = formatType(Math.floor(seconds / 3600))
  const m = formatType(Math.floor((seconds - h * 3600) / 60))
  const s = formatType(Math.floor(seconds % 60))
  return {
    h, m, s
  }
}

function formatType (num, length = 2) {
  if (num < 10) {
    num = `0${num}`
  }
  return num
}
