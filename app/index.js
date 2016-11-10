import { webFrame, ipcRenderer } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import loadServicesFromStorage from './utils/loadServicesFromStorage'
import { getAwsCredentials, updateAwsProfile } from './utils/aws'
import checkForUpdates from './utils/checkForUpdates'
import setupErrorTracking from '../desktop/utils/setupErrorTracking'
import './app.global.css'

if (process.env.NODE_ENV !== 'development') {
  setupErrorTracking()
}

// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1)

/* IPC for debuging */
ipcRenderer.send('ui-ready', 'ping')
ipcRenderer.on('debugFromMain', (e, arg) => {
  console.log(arg)
})

checkForUpdates().then((data) => {
  if (data.version) {
    console.log('version out of date!')
    console.log('new version data', data)
    // do update alert
  }
})

updateAwsProfile('default')

const safedServices = loadServicesFromStorage()
const initialState = {
  services: safedServices,
  credentials: getAwsCredentials()
}
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
