import { webFrame, ipcRenderer } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import loadServicesFromStorage from './utils/loadServicesFromStorage'
import {
  getAWSCredentials,
  getAWSProfileData,
  // deleteAWSProfile
} from './utils/aws'
import checkForUpdates from './utils/checkForUpdates'
import setupErrorTracking from '../desktop/utils/setupErrorTracking'
import './app.global.css'

if (process.env.NODE_ENV === 'development') {
  setupErrorTracking()
}

// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1)

/* IPC for debuging */
ipcRenderer.send('ui-ready', 'ping')
ipcRenderer.on('userId', (evt, userId) => {
  // eslint-disable-next-line no-console
  console.log(`%cUserId: ${userId}`, 'color: blue')
  if (process.env.NODE_ENV !== 'development') {
    window.analytics.identify(userId)
  }
})

checkForUpdates().then((data) => {
  if (data.version) {
    // eslint-disable-next-line no-console
    console.log('version out of date!')
    // eslint-disable-next-line no-console
    console.log('new version data', data)
    // do update alert
  }
})

const specificDataByID = getAWSProfileData('serverless_dev')
// eslint-disable-next-line no-console
console.log('specificDataByID', specificDataByID)
// const awsCredsFileAfterDelete = deleteAWSProfile('serverless_staging')
// console.log('awsCredsFileAfterDelete', awsCredsFileAfterDelete)

const safedServices = loadServicesFromStorage()
const initialState = {
  services: safedServices,
  credentials: getAWSCredentials()
}
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
