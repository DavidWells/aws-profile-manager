import fixPath from 'fix-path'
import { ADD_COMMAND, UPDATE_COMMAND_OUTPUT } from '../constants/actions'
import getServerlessCMDPath from '../utils/serverless/getServerlessCMDPath'
import spawn from '../utils/child_process/betterSpawn'

export default (serviceId, name, eventData) => (dispatch, getState) => {
  const service = getState().services[serviceId]
  let args = [
    'invoke',
    '--function', `${name}`,
    '--stage', `${service.stage}`,
    '--region', `${service.region}`,
  ]
  if (eventData) {
    args = args.concat(['--data', `${JSON.stringify(eventData)}`])
    // show logs
    args = args.concat(['-l'])
  }
  dispatch({
    type: ADD_COMMAND,
    serviceId,
    command: {
      name: 'invoke',
      output: `serverless ${args.join(' ')}\n`,
    }
  })
  if (process.env.NODE_ENV !== 'development') {
    fixPath()
  }
  const serverlessCMDPath = getServerlessCMDPath()
  const deploy = spawn(serverlessCMDPath, args, { cwd: service.projectPath })

  deploy.stdout.on('data', (data) => {
    dispatch({
      type: UPDATE_COMMAND_OUTPUT,
      serviceId,
      output: data
    })
  })

  deploy.stderr.on('data', (data) => {
    dispatch({
      type: UPDATE_COMMAND_OUTPUT,
      serviceId,
      output: data
    })
  })
}
