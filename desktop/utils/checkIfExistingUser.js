const path = require('path')
const os = require('os')
const fs = require('fs')
const fse = require('fs-extra')
const serverlessDirPath = path.join(os.homedir(), '.serverless')
const statsDisabledFilePath = path.join(serverlessDirPath, 'stats-disabled')
const statsEnabledFilePath = path.join(serverlessDirPath, 'stats-enabled')

function fileExists(filePath) {
  try {
    const stats = fs.statSync(filePath) // eslint-disable-line
    return true
  } catch (err) {
    return false
  }
}

module.exports = function isPreviousUser() {
  try {
    if (fileExists(statsEnabledFilePath) && fse.lstatSync(statsEnabledFilePath).isFile()) {
      return fse.readFileSync(statsEnabledFilePath).toString()
    }
    if (fileExists(statsDisabledFilePath) && fse.lstatSync(statsDisabledFilePath).isFile()) {
      return fse.readFileSync(statsDisabledFilePath).toString()
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
