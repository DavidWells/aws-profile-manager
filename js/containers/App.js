import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Dashboard from '../components/Dashboard';
import { Router, Route, IndexRoute } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import DevTools from './DevTools';

const history = createBrowserHistory();
const store = configureStore();

syncReduxAndRouter(history, store);

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <div className="fill-height">
          <Router history={history}>
            <Route path="/" component={Dashboard} />
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
});
