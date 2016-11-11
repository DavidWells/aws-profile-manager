import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR } from '../constants/actions'
import { updateAWSProfile } from '../utils/aws'

export default (profileName, values) => (dispatch) => {
  const result = updateAWSProfile(profileName, values)
  if (result) {
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      profile: {
        ...values,
        profile: profileName,
      },
    })
  } else {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      profile: {
        ...values,
        profile: profileName,
      },
    })
  }
}
