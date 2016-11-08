import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import CreateService from './containers/CreateService'
import Service from './containers/Service'
import FunctionDetail from './containers/FunctionDetail'
import SettingsPage from './components/SettingsPage'
import AddCredentials from './components/AddCredentials'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Dashboard} />
    <Route path='/settings' component={SettingsPage} />
    <Route path='/service/create' component={CreateService} />
    <Route path='/service/:serviceId' component={Service} />
    <Route path='/service/:serviceId/function/:functionName' component={FunctionDetail} />
    <Route path='/add-credentials' component={AddCredentials} />
    <Route path='*' component={SettingsPage} />
  </Route>
)
