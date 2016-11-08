import fs from 'fs'
import path from 'path'

const walkDirSync = (dirPath) => {
  let filePaths = []
  let list = fs.readdirSync(dirPath)
  list = list.filter(item => !(/(^|\/)\.[^/.]/g).test(item))
  list.forEach(filePathParam => {
    let filePath = filePathParam
    filePath = path.join(dirPath, filePath)
    // console.log('filePath', filePath)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      filePaths = filePaths.concat(walkDirSync(filePath))
    } else {
      filePaths.push(filePath)
    }
  })

  return filePaths
}

export default walkDirSync
