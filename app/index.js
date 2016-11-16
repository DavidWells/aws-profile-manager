import { webFrame, ipcRenderer } from 'electron'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import loadServicesFromStorage from './utils/loadServicesFromStorage'
import newHandleUser, { setUUID } from './utils/serverless/newUser'
import { getAWSCredentials } from './utils/aws'
import setupErrorTracking from '../desktop/utils/setupErrorTracking'
import './app.global.css'

// temporary clear storage for old users
if (!window.localStorage.getItem('resetApplication')) {
  window.localStorage.removeItem('services')
  window.localStorage.setItem('resetApplication', 'true')
}

if (process.env.NODE_ENV !== 'development') {
  setupErrorTracking()
}
setUUID()
// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1)

/* IPC for debuging */
ipcRenderer.send('ui-ready', 'ping')
ipcRenderer.on('userId', (evt, userId) => {
  if (!userId) {
    newHandleUser()
  }
  // eslint-disable-next-line no-console
  // console.log(`%cUserId: ${userId}`, 'color: blue')
  if (process.env.NODE_ENV !== 'development') {
    if (userId) {
      window.analytics.identify(userId)
    }
  }
})

const savedServices = loadServicesFromStorage()
const initialState = {
  services: savedServices,
  credentials: getAWSCredentials()
}
const store = configureStore(initialState)

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
