import path from 'path'
import { remote } from 'electron'

/*
Because dev mode and packaged app work in different contexts,
we need to specify the correct bin paths
*/
export default function getCorrectServerlessPath() {
  if (process.env.NODE_ENV === 'development') {
    return 'serverless'
  }

  const appPath = remote.app.getAppPath()
  const packagedPath = path.join(appPath, 'node_modules', 'serverless', 'bin', 'serverless')
  return packagedPath
}
