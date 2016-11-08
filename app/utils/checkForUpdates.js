import axios from 'axios'
import getAppVersion from './electron/getAppVersion'
/* Update notifier until we sign app */
export default function checkForUpdates() {
  const currentVersion = getAppVersion
  const url = `https://50h6yacab8.execute-api.us-west-2.amazonaws.com/dev/update?version=${currentVersion}`
  return axios.get(url).then((response) => {
    return response.data
  }).catch((err) => {
    return err
  })
}
