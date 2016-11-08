import { ADD_SERVICE } from '../constants/actions'

export default (service, credentials) => {
  return {
    type: ADD_SERVICE,
    service,
    credentials,
  }
}
