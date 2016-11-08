import { ADD_CREDENTIALS } from '../constants/actions'

export default (credentials) => {
  return { type: ADD_CREDENTIALS, credentials }
}
