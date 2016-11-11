import {
  ADD_CREDENTIALS,
  ADD_PROFILE_SUCCESS,
} from '../constants/actions'
import { appendAwsCredentials } from '../utils/aws'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_CREDENTIALS:
      // TODO this is a side-effect and should be handles with redux-saga or similar
      return appendAwsCredentials(action.credentials)
    case ADD_PROFILE_SUCCESS:
      return {
        ...state,
        [action.profile.profile]: action.profile,
      }
    default:
      return state
  }
}
