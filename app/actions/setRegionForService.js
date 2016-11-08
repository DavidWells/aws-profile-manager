import { SET_REGION_FOR_SERVICE } from '../constants/actions'

export default (region, serviceId) => {
  return {
    type: SET_REGION_FOR_SERVICE,
    region,
    serviceId
  }
}
