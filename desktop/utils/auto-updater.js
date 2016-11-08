/*eslint-disable */
const app = require('electron').app
const autoUpdater = require('electron').autoUpdater
const ChildProcess = require('child_process')
const Menu = require('electron').Menu
// const { ipcMain } = require('electron')
const path = require('path')

let state = 'checking'

exports.initialize = function () {
  if (process.mas) return
  const FEED_URL = 'https://aye5i2n4ej.execute-api.us-west-2.amazonaws.com/dev/update?version=0.2.0'
  const appVersion = app.getVersion()
  console.log('current app version', appVersion)
  autoUpdater.on('checking-for-update', () => {
    state = 'checking'
    console.log('check for update')
    exports.updateMenu()
  })

  autoUpdater.on('update-available', () => {
    console.log('check for update')
    state = 'checking'
    exports.updateMenu()
  })

  autoUpdater.on('update-downloaded', () => {
    state = 'installed'
    exports.updateMenu()
  })

  autoUpdater.on('update-not-available', () => {
    state = 'no-update'
    console.log('No updates found')
    exports.updateMenu()
  })
  autoUpdater.on('error', (err, msg) => {
    console.error('Error fetching updates', `${msg} (${err.stack})`)
    exports.updateMenu()
  })
  autoUpdater.setFeedURL(FEED_URL)
  autoUpdater.checkForUpdates()
}

exports.updateMenu = function () {
  if (process.mas) return

  const menu = Menu.getApplicationMenu()
  // console.log('has menu?', menu)
  if (!menu) return

  menu.items.forEach((item) => {
    if (item.submenu) {
      item.submenu.items.forEach((item) => {
        console.log('item.key', item.key)
        switch (item.key) {
          case 'checkForUpdate':
            item.visible = state === 'no-update'
            break
          case 'checkingForUpdate':
            item.visible = state === 'checking'
            break
          case 'restartToUpdate':
            item.visible = state === 'installed'
            break

        }
      })
    }
  })
}

exports.createShortcut = function (callback) {
  spawnUpdate([
    '--createShortcut',
    path.basename(process.execPath),
    '--shortcut-locations',
    'StartMenu'
  ], callback)
}

exports.removeShortcut = function (callback) {
  spawnUpdate([
    '--removeShortcut',
    path.basename(process.execPath)
  ], callback)
}

function spawnUpdate(args, callback) {
  const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe')
  let stdout = ''
  let spawned = null

  try {
    spawned = ChildProcess.spawn(updateExe, args)
  } catch (error) {
    if (error && error.stdout == null) error.stdout = stdout
    process.nextTick(() => { callback(error) })
    return
  }

  let error = null

  spawned.stdout.on('data', (data) => { stdout += data })

  spawned.on('error', (processError) => {
    if (!error) error = processError
  })

  spawned.on('close', (code, signal) => {
    if (!error && code !== 0) {
      error = new Error(`Command failed: ${code} ${signal}`)
    }
    if (error && error.code == null) error.code = code
    if (error && error.stdout == null) error.stdout = stdout
    callback(error)
  })
}
