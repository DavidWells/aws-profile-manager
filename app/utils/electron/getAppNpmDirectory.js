import path from 'path'
// Guess at NPM's global install dir
export default function getAppNpmDirectory() {
  let npmGlobalPrefix
  if (process.platform === 'win32') {
    npmGlobalPrefix = path.dirname(process.execPath)
  } else {
    npmGlobalPrefix = path.dirname(path.dirname(process.execPath))
  }
  return path.resolve(npmGlobalPrefix, 'app', 'node_modules')
}
