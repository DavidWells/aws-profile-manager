import { ADD_PROFILE_SUCCESS, ADD_PROFILE_ERROR } from '../constants/actions'
import { createAWSProfile } from '../utils/aws'

export default (profile) => (dispatch) => {
  const result = createAWSProfile(profile)
  if (result) {
    dispatch({
      type: ADD_PROFILE_SUCCESS,
      profile,
    })
  } else {
    dispatch({
      type: ADD_PROFILE_ERROR,
      profile,
    })
  }
}
