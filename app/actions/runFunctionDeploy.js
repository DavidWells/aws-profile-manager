import path from 'path'
import fixPath from 'fix-path'
import { ADD_COMMAND, UPDATE_COMMAND_OUTPUT } from '../constants/actions'
import getServerlessCMDPath from '../utils/serverless/getServerlessCMDPath'
import spawn from '../utils/child_process/betterSpawn'


export default (serviceId, name) => (dispatch, getState) => {
  const service = getState().services[serviceId]
  const args = [
    'deploy',
    'function',
    '--function', `${name}`,
    '--stage', `${service.stage}`,
    '--region', `${service.region}`,
  ]
  dispatch({
    type: ADD_COMMAND,
    serviceId,
    command: {
      name: 'deploy --function',
      output: `serverless ${args.join(' ')}\n`,
    }
  })
  console.log('before PATH', process.env.PATH)
  if (process.env.NODE_ENV !== 'development') {
    fixPath()
  }
  console.log('AFTER: process.env.PATH', process.env.PATH)

  const cwdNodeModules = path.resolve('node_modules')
  console.log('cwdNodeModules', cwdNodeModules)

  let slsCommand
  try {
    const options = {
      cwd: service.projectPath,
      env: process.env
    }
    const serverlessCMDPath = getServerlessCMDPath()
    console.log('serverlessCMDPath', serverlessCMDPath)
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
  // pipe errors in command out
  slsCommand.on('error', (err) => {
    console.log('ERROR in COMMAND')
    console.log(JSON.stringify(err))
    if (err.code.match(/ENOENT/)) {
      console.log('prompt for global sls install')
    }
  })

  slsCommand.stdout.on('data', (data) => {
    dispatch({
      type: UPDATE_COMMAND_OUTPUT,
      serviceId,
      output: data
    })
  })
  // Errors from sls CLI. Dont need to show in UI?
  slsCommand.stderr.on('data', (_data) => {
    // console.log('error from sls', data)
    // dispatch({
    //   type: UPDATE_COMMAND_OUTPUT,
    //   serviceId,
    //   output: data
    // })
  })
  // 'exit' emits when the child exits but the stdio are not yet closed.
  slsCommand.on('exit', (code) => {
    console.log('exit', code)
  })
  // 'close' emits when the child has exited and its stdios are closed.
  slsCommand.on('close', code => {
    console.log(`child process exited with code ${code}`)
  })
}
