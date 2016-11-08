import walkDirSync from '../utils/walkDirSync'
import parseServiceYaml from '../utils/parseServiceYaml'
import {
  UPDATE_SERVICE_DETAILS,
  UPDATE_SERVICE_DETAILS_ERROR,
} from '../constants/actions'
import {
  PATH_NOT_FOUND,
  PARSING_YAML_FAILED,
} from '../constants/errors'

export default (serviceId) => (dispatch, getState) => {
  const service = getState().services[serviceId]
  try {
    const filePaths = walkDirSync(service.projectPath)
    parseServiceYaml(service.projectPath)
      .then((data) => {
        dispatch({
          type: UPDATE_SERVICE_DETAILS,
          serviceId,
          filePaths,
          config: data,
        })
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_SERVICE_DETAILS_ERROR,
          serviceId,
          error: {
            type: PARSING_YAML_FAILED,
            message: error
          }
        })
      })
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_DETAILS_ERROR,
      serviceId,
      error: {
        type: PATH_NOT_FOUND,
        message: error
      }
    })
  }
}
