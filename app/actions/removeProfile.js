import { REMOVE_PROFILE_SUCCESS, REMOVE_PROFILE_ERROR } from '../constants/actions'
import { deleteAWSProfile } from '../utils/aws'

export default (profileName) => (dispatch) => {
  const result = deleteAWSProfile(profileName)
  if (result) {
    dispatch({
      type: REMOVE_PROFILE_SUCCESS,
      profileName,
    })
  } else {
    dispatch({
      type: REMOVE_PROFILE_ERROR,
      profileName,
    })
  }
}
