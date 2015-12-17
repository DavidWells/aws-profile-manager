import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Dashboard from '../components/Dashboard';
import { Redirect, Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools';

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <div>
          <ReduxRouter>
            <Route path="/" component={Dashboard} />
          </ReduxRouter>
          <DevTools />
        </div>
      </Provider>
    );
  }
});
