import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import * as reducers from '../reducers/index';

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const createHistory = process.env.NODE_ENV === 'production' ?
  createHashHistory : createBrowserHistory

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({ createHistory }),
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const rootReducer = combineReducers(Object.assign({ router: routerStateReducer }), reducers);

export default function configureStore(initialState) {
   const store = createStoreWithMiddleware(rootReducer, initialState);

   if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
