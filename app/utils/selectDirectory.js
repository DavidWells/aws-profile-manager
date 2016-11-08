import electron from 'electron'

export default () => electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
