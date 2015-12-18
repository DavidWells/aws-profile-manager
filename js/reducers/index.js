import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import app from './app';

export default combineReducers({
  app: app,
  routing: routeReducer
});
