/**
 * WIP. for future use
 */

export function getObjectPropertyByString(string, object) {
  const properties = string.split('.')
  properties.splice(0, 1) // splice off top key
  let tempObject = object[properties[0]]
  if (tempObject) {
    for (let i = 1, length = properties.length; i < length; i++) {
      const exists = tempObject[properties[i]]
      if (exists) {
        tempObject = exists
      } else {
        tempObject = null
        break
      }
    }
  }
  return tempObject
}

export function setObjectPropertyByString(path, value, object) {
  const steps = path.split('.')
  let i = 0
  let cur

  for (; i < steps.length - 1; i++) {
    cur = object[steps[i]]

    if (cur !== undefined) {
      object = cur // eslint-disable-line
    } else {
      break
    }
  }
  object[steps[i]] = value // eslint-disable-line
  return object
}
