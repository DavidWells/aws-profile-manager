/*
Will be a functional replacement for https://github.com/serverless/serverless/blob/master/lib/classes/Utils.js
 */
/*eslint-disable */

const BbPromise = require('bluebird')
const fse = BbPromise.promisifyAll(require('fs-extra'))

export default function fileExistsSync(filePath) {
  try {
    const stats = fse.lstatSync(filePath)
    return stats.isFile()
  } catch (e) {
    return false
  }
}
