import { CLEAR_CONSOLE_FOR_SERVICE } from '../constants/actions'

export default (serviceId) => {
  return {
    type: CLEAR_CONSOLE_FOR_SERVICE,
    serviceId
  }
}
