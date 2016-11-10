const fs = require('fs-extra')

module.exports = function emptyDirectory(path, callBack) {
  fs.emptyDir(path, (error) => {
    if (error) {
      console.log(`emptyDirectory fail! ${path}`)
      callBack(error)
    }
    callBack && callBack(null)
  })
}
