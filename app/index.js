import React from 'react'
import { webFrame } from 'electron'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import routes from './routes'
import configureStore from './store/configureStore'
import { getAWSCredentials } from './utils/aws'
import './app.global.css'


// Disable pinch zoom
webFrame.setZoomLevelLimits(1, 1)

const store = configureStore({
  credentials: getAWSCredentials()
})

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
