import electron from 'electron'

export default () => {
  return electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
}
