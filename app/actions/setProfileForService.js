import { SET_PROFILE_FOR_SERVICE } from '../constants/actions'

export default (profile, serviceId) => {
  return {
    type: SET_PROFILE_FOR_SERVICE,
    profile,
    serviceId
  }
}
