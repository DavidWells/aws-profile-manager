import uuid from 'uuid'
import axios from 'axios'
import getAppVersion from '../electron/getAppVersion'
import getAppPath from '../electron/getAppPath'

export function setUUID() {
  if (!window.localStorage.getItem('id')) {
    window.localStorage.setItem('id', uuid.v4())
  }
}

export function getUUID() {
  return window.localStorage.getItem('id')
}

export default function newUser() {
  const data = {
    uuid: getUUID(),
    version: getAppVersion, // eslint-disable-line
    appPath: getAppPath()
  }
  return axios.post('https://luuepop8l3.execute-api.us-west-2.amazonaws.com/dev/submit', data)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
}
