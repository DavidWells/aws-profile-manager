/* util for getting correct app version locally and in prod */
import { remote } from 'electron'

let currentVersion // eslint-disable-line
if (process.env.NODE_ENV === 'development') {
  const pkg = require('../../../package.json') // eslint-disable-line
  // get version messed up. Need to read from package.json
  currentVersion = pkg.version
} else {
  // in prod, app version works correctly
  currentVersion = remote.app.getVersion()
}

export default currentVersion
