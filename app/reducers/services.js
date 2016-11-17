/**
 * Architecture Note: Nik on 2016-11-03
 * Service not only contains the service data, but also the user config
 * like which profile to use for deployment. This way the everything
 * related to service gets removed once the service gets removed.
 */

/* eslint-disable no-case-declarations, no-redeclare */
import omit from 'lodash/omit'
import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  UPDATE_SERVICE,
  SET_STAGE_FOR_SERVICE,
  SET_REGION_FOR_SERVICE,
  SET_PROFILE_FOR_SERVICE,
  ADD_COMMAND,
  UPDATE_COMMAND_OUTPUT,
  UPDATE_SERVICE_DETAILS,
  UPDATE_SERVICE_DETAILS_ERROR,
  CLEAR_CONSOLE_FOR_SERVICE,
} from '../constants/actions'
import {
  region as defaultRegion,
  stage as defaultStage,
} from '../constants/serviceDefaults'
import flattenObject from '../utils/flattenObject'
import unflattenObject from '../utils/unflattenObject'
import saveServicesToStorage from '../utils/saveServicesToStorage'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_SERVICE:
      const profileKeys = Object.keys(action.credentials)
      let setRegion = defaultRegion
      if (action.service.config
        && action.service.config.defaults
        && action.service.config.defaults.region) {
        setRegion = action.service.config.defaults.region
      }
      if (action.service.config
        && action.service.config.provider
        && action.service.config.provider.region) {
        setRegion = action.service.config.provider.region
      }
      const newState1 = {
        ...state,
        [action.service.id]: {
          ...action.service,
          commands: [],
          lastCommandCleared: false,
          region: setRegion,
          stage: defaultStage,
          profile: profileKeys[0],
          error: null,
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState1)
      return newState1
    case REMOVE_SERVICE:
      const newState2 = omit(state, action.serviceId)
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState2)
      return newState2
    case SET_STAGE_FOR_SERVICE:
      const newState3 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          stage: action.stage
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState3)
      return newState3
    case UPDATE_SERVICE:
      console.log('REDUCER RAN UPDATE SERVICE')
      // console.log('action.service', action.service)
      // console.log('action.valuePath', action.valuePath)
      // console.log('action.newValue', action.newValue)
      const objectpath = action.valuePath.replace('service.config.', '')
      // console.log('objectpath', objectpath)
      const newConfig = { ...{}, ...action.service.config }
      const flatConfig = flattenObject(newConfig)
      if (flatConfig[objectpath]) {
        flatConfig[objectpath] = action.newValue
      }
      const updatedConfig = unflattenObject(flatConfig)
      // objectPath.set(newConfig, objectpath, action.newValue)
      const newStateUpdateService = {
        ...state,
        [action.service.id]: {
          ...state[action.service.id],
          config: updatedConfig
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newStateUpdateService)
      return newStateUpdateService
    case SET_REGION_FOR_SERVICE:
      const newState4 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          region: action.region
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState4)
      return newState4
    case SET_PROFILE_FOR_SERVICE:
      const newState5 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          profile: action.profile
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState5)
      return newState5
    case ADD_COMMAND:
      const newState6 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          commands: [action.command, ...state[action.serviceId].commands]
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState6)
      return newState6
    case UPDATE_COMMAND_OUTPUT:
      const [latestCommand, ...oldCommands] = state[action.serviceId].commands
      const newState7 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          lastCommandCleared: false,
          commands: [
            {
              ...latestCommand,
              output: `${latestCommand.output}${action.output}`
            },
            ...oldCommands
          ]
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState7)
      return newState7
    case UPDATE_SERVICE_DETAILS:
      const newState8 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          config: action.config,
          filePaths: action.filePaths,
          error: null,
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState8)
      return newState8
    case UPDATE_SERVICE_DETAILS_ERROR:
      const newState9 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          error: action.error
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState9)
      return newState9
    case CLEAR_CONSOLE_FOR_SERVICE:
      const newState10 = {
        ...state,
        [action.serviceId]: {
          ...state[action.serviceId],
          lastCommandCleared: true,
        }
      }
      // Note: this is a side-effect and should be handled with redux-sage or similar
      saveServicesToStorage(newState10)
      return newState10
    default:
      return state
  }
}
