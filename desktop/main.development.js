/**
 * Main Electron thread. Builds to ../main.js
 */
import path from 'path'
import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron'
import checkIfExistingUser from './utils/checkIfExistingUser'

const installDevExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer') // eslint-disable-line

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload)
      } catch (e) {} // eslint-disable-line
    }
  }
}
// import pkg from './package.json'
// const autoUpdater = require('./auto-updater')
const isDev = (process.env.NODE_ENV === 'development')
let menu
let template
let mainWindow = null

if (isDev) {
  // eslint-disable-next-line global-require
  require('electron-debug')()
}

// eslint-disable-next-line global-require
// Raven tracking is broken. This needs to be verified with `npm run package` that is works in the packaged application.
// require('./utils/setupErrorTracking')()

process.on('uncaughtException', (error) => {
  console.error(`ERROR Exception => ${error.stack}`)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('open-url', (e, url) => {
  e.preventDefault()

  if (mainWindow) {
    mainWindow.webContents.send('open-url-event', url)

    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    } else {
      mainWindow.focus()
    }
  }
})

// turn on when signing keys ready
// autoUpdater.updateMenu()

app.on('ready', async () => {
  await installDevExtensions()

  // turn on when signing keys ready
  // autoUpdater.initialize()

  ipcMain.on('ui-ready', (event, arg) => {
    const userId = checkIfExistingUser()
    event.sender.send('userId', userId)
  })

  ipcMain.on('reset-and-restart-app', (event, arg) => {
    event.sender.send('debugFromRestartMain', 'it ran')
    app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
    app.exit(0)
    event.sender.send('debugFromRestartMain', 'relaunch ran?')
  })

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  })

  // production app path is slightly different. Needs 'desktop' prefix
  // const appHTMLPath = (isDev) ? path.join(__dirname, 'index.html') : path.join(__dirname, 'desktop', 'index.html')
  const appHTMLPath = path.join(__dirname, 'index.html')
  mainWindow.loadURL(`file://${appHTMLPath}`)

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (isDev) {
    mainWindow.openDevTools()
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y)
        }
      }]).popup(mainWindow)
    })
  }
  // TODO menu menu to own file
  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About Serverless Dashboard',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide Dashboard',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit()
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          mainWindow.webContents.reload()
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools()
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      },
      {
        label: 'Toggle Debug Mode',
        accelerator: 'Alt+Command+I',
        click() {
          mainWindow.toggleDevTools()
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://serverless.com')
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('http://serverless.com/framework/docs')
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('http://forum.serverless.com')
        }
      }, {
        label: 'Community Chat',
        click() {
          shell.openExternal('https://gitter.im/serverless/serverless')
        }
      }]
    }]

    menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // Windows menu
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click() {
          mainWindow.close()
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click() {
          mainWindow.webContents.reload()
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click() {
          mainWindow.toggleDevTools()
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      }]
    }]
    menu = Menu.buildFromTemplate(template)
    mainWindow.setMenu(menu)
  }
})
