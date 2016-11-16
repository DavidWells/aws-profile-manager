
/*eslint-disable */
export default function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data
  }
  let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g
  let resultholder = {}
  for (const p in data) {
    let cur = resultholder
    let prop = ''
    let m
    while (m = regex.exec(p)) { // eslint-disable-line
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
      prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return resultholder[''] || resultholder
}
