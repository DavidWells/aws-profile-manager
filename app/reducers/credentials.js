import { ADD_CREDENTIALS } from '../constants/actions'
import appendAwsCredentials from '../utils/appendAwsCredentials'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CREDENTIALS:
      // TODO this is a side-effect and should be handles with redux-saga or similar
      return appendAwsCredentials(action.credentials)
    default:
      return state
  }
}
