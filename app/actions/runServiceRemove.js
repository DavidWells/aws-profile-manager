import fixPath from 'fix-path'
import {
  ADD_COMMAND,
  UPDATE_COMMAND_OUTPUT
} from '../constants/actions'
import getServerlessCMDPath from '../utils/serverless/getServerlessCMDPath'
import spawn from '../utils/child_process/betterSpawn'

export default (serviceId) => (dispatch, getState) => {
  const service = getState().services[serviceId]
  const args = [
    'remove',
    '--stage', `${service.stage}`,
    '--region', `${service.region}`,
  ]
  dispatch({
    type: ADD_COMMAND,
    serviceId,
    command: {
      name: 'remove',
      output: `serverless ${args.join(' ')}\n`,
    }
  })
  if (process.env.NODE_ENV !== 'development') {
    fixPath()
  }
  let slsCommand
  try {
    const options = {
      cwd: service.projectPath,
      env: process.env
    }
    const serverlessCMDPath = getServerlessCMDPath()
    slsCommand = spawn(serverlessCMDPath, args, options)
  } catch (error) {
    if (error && error.stdout == null) {
      error.stdout = ''
    }
    process.nextTick(() => {
      console.warn(error)
      // if (callback) {
      //   callback(error)
      // }
    })
    return
  }

  slsCommand.stdout.on('data', (data) => {
    dispatch({
      type: UPDATE_COMMAND_OUTPUT,
      serviceId,
      output: data
    })
  })

  slsCommand.stderr.on('data', (data) => {
    dispatch({
      type: UPDATE_COMMAND_OUTPUT,
      serviceId,
      output: data
    })
  })
}
