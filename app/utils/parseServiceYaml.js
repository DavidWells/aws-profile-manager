/**
 * Parse the Service Yaml and populate Service Variables from Serverless instance
 */
import Serverless from 'serverless'

export default function parseServiceYaml(path) {
  // CD into project directory
  process.chdir(path)
  const serverless = new Serverless()
  return serverless.service.load()
    .then(() => {
      const service = serverless.variables.populateService()
      return {
        defaults: service.defaults,
        functions: service.functions,
        provider: service.provider,
        resources: service.resources,
        service: service.service,
      }
    })
}
