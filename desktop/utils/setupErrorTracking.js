module.exports = () => {
  if (process.type === 'browser') {
    // eslint-disable-next-line no-console
    console.log('Setup Browser/Main Process Error Tracking')
    // main process
    // eslint-disable-next-line global-require
    const raven = require('raven')
    const client = new raven.Client('https://2961feaae16a4ae18e4a63a5fa54b67a:71e01192e348489f912684133bdc86d2@sentry.io/111960')
    client.patchGlobal()

    process.on('uncaughtException', (err) => {
      // eslint-disable-next-line global-require
      const dialog = require('electron').dialog

      dialog.showMessageBox({
        type: 'error',
        message: 'An error occurred our side. Please reach out to the Serverless team to resolve the issue.',
        detail: err.stack,
        buttons: ['OK'],
      })
    })
  } else if (process.type === 'renderer') {
    // eslint-disable-next-line no-console
    console.log('Setup Renderer Process Error Tracking')
    // renderer process
    // eslint-disable-next-line global-require
    const Raven = require('raven-js')
    // eslint-disable-next-line global-require
    const appVersion = require('electron').remote.getGlobal('sharedObject').appVersion
    // eslint-disable-next-line no-console
    console.log(`%c APP VERSION: ${appVersion}`, 'color: blue')

    Raven
      .config('https://2961feaae16a4ae18e4a63a5fa54b67a@sentry.io/111960', {
        release: appVersion
      })
      .install()
  }
}
