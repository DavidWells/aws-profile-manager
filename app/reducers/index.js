import { combineReducers } from 'redux'
import services from './services'
import credentials from './credentials'

const rootReducer = combineReducers({
  services,
  credentials,
})

export default rootReducer
