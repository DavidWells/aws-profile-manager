import fs from 'fs'

export default function atomicWriteFileSync(filepath, content, callback) {
  const randomId = backupID()
  const backupPath = `${filepath}.${randomId}.bak`
  try {
    fs.writeFileSync(backupPath, content)
  } catch (e) {
    throw e
  }
  try {
    // TODO: backup silently fails. Might need to backup to a different spot
    console.log('do rename')
    console.log('backupPath', backupPath)
    console.log('filepath', filepath)
    fs.renameSync(backupPath, filepath)
  } catch (e) {
    throw e
  }
  if (callback) {
    callback()
  }
}

const rand = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}
const backupID = () => {
  return `local-${rand()}${rand()}-${rand()}`
}
