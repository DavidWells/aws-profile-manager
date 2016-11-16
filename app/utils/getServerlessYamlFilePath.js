import fs from 'fs'
import path from 'path'
import walkDirSync from './walkDirSync'

export default function getServerlessYamlPath(directory) {
  try {
    const ymlPath = path.join(directory, 'serverless.yml') || path.join(directory, 'serverless.yaml')
    fs.accessSync(ymlPath)
    return ymlPath
  } catch (err) {
    // Can't find, look in sub directories
    const filePaths = walkDirSync(directory)
    const ymlPaths = filePaths.filter((filePath) => {
      return filePath.indexOf('serverless.yaml') > -1 || filePath.indexOf('serverless.yml') > -1
    })
    if (ymlPaths && ymlPaths.length === 1) {
      return ymlPaths[0]
    }
    if (ymlPaths && ymlPaths.length > 1) {
      throw 'More than one serverless.yml found' // eslint-disable-line
    }
  }
  return false
}
