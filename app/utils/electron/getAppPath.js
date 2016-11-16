/* util for getting correct app version locally and in prod */
import { remote } from 'electron'

export default function getAppPath() {
  return remote.app.getAppPath()
}
