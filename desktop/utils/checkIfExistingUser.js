const path = require('path')
const os = require('os')
const fse = require('fs-extra')
const serverlessDirPath = path.join(os.homedir(), '.serverless')
const statsDisabledFilePath = path.join(serverlessDirPath, 'stats-disabled')
const statsEnabledFilePath = path.join(serverlessDirPath, 'stats-enabled')

module.exports = function isPreviousUser() {
  try {
    if (fse.lstatSync(statsEnabledFilePath).isFile()) {
      return fse.readFileSync(statsEnabledFilePath).toString()
    }
    if (fse.lstatSync(statsDisabledFilePath).isFile()) {
      return fse.readFileSync(statsDisabledFilePath).toString()
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
