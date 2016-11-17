/*
Merge YML objects and add 'keyname_var' if value is populated by variable
*/
export default function mergeYamlObjects(target, source) {
  let item
  let tItem
  let o
  let idx
  let targetItem

  // If either argument is undefined, return the other.
  // If both are undefined, return undefined.
  if (typeof source === 'undefined') {
    return source
  } else if (typeof target === 'undefined') {
    return target
  }

  // Assume both are objects and don't care about inherited properties
  for (const prop in source) { // eslint-disable-line
    item = source[prop]
    targetItem = target[prop]

    if (typeof item === 'object' && item !== null) {
      if (isArray(item) && item.length) {
        // deal with arrays, will be either array of primitives or array of objects
        // If primitives
        if (typeof item[0] !== 'object') {
          // if target doesn't have a similar property, just reference it
          tItem = target[prop]
          if (!tItem) {
            target[prop] = item // eslint-disable-line
          // Otherwise, copy only those members that don't exist on target
          } else {
            // Create an index of items on target
            o = {}
            for (let i = 0, iLen = tItem.length; i < iLen; i++) {
              o[tItem[i]] = true
            }

            // Do check, push missing
            for (let j = 0, jLen = item.length; j < jLen; j++) {
              if (!(item[j] in o)) {
                tItem.push(item[j])
              }
            }
          }
        } else {
          // Deal with array of objects
          // Create index of objects in target object using ID property
          // Assume if target has same named property then it will be similar array
          idx = {}
          tItem = target[prop]

          for (let k = 0, kLen = tItem.length; k < kLen; k++) {
            idx[tItem[k].id] = tItem[k]
          }

          // Do updates
          for (let l = 0, ll = item.length; l < ll; l++) {
            // If target doesn't have an equivalent, just add it
            if (!(item[l].id in idx)) {
              tItem.push(item[l])
            } else {
              mergeYamlObjects(idx[item[l].id], item[l])
            }
          }
        }
      } else {
        // deal with object
        mergeYamlObjects(target[prop], item)
      }
    } else {
      // item is a primitive, just copy it over
      target[prop] = item // eslint-disable-line
      if (source[prop] && targetItem && (targetItem !== item)) {
        // Add variable reference to configuration object
        // TODO: fix for array values
        target[`${prop}_var`] = targetItem // eslint-disable-line
      }
    }
  }
  return target
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
