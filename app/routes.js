import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import AddCredentials from './components/AddCredentials'
import ManageCredentials from './containers/ManageCredentials'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ManageCredentials} />
    <Route path='/add-credentials' component={AddCredentials} />
    <Route path='/manage-credentials' component={ManageCredentials} />
    <Route path='*' component={ManageCredentials} />
  </Route>
)
