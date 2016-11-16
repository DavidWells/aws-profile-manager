/**
 * Needed for meshing yamlJSON with AST
 */
export default function flattenObject(data) {
  const result = {}
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++) { // eslint-disable-line
        recurse(cur[i], `${prop}[${i}]`)
      }
      if (l == 0) { // eslint-disable-line
        result[prop] = []
      }
    } else {
      let isEmpty = true
      for (const p in cur) { // eslint-disable-line
        isEmpty = false
        recurse(cur[p], prop ? `${prop}.${p}` : p)
      }
      if (isEmpty && prop) {
        result[prop] = {}
      }
    }
  }
  recurse(data, '')
  return result
}
