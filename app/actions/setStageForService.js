import { SET_STAGE_FOR_SERVICE } from '../constants/actions'

export default (stage, serviceId) => {
  return {
    type: SET_STAGE_FOR_SERVICE,
    stage,
    serviceId
  }
}
