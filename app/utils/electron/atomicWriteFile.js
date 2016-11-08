import fs from 'fs'

// eslint-disable-next-line import/prefer-default-export
export function atomicWriteFileSync(filepath, content) {
  // TODO: add random number generator
  const randomId = 'lsdalalkjdlkjdlksjdlkjdalk'
  const backupPath = `${filepath}.${randomId}.bak`
  fs.writeFileSync(backupPath, content)
  fs.renameSync(backupPath, filepath)
}
