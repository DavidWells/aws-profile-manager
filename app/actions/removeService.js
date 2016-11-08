import { REMOVE_SERVICE } from '../constants/actions'

export default (serviceId) => {
  return { type: REMOVE_SERVICE, serviceId }
}
