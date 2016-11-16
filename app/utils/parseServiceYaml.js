/**
 * Parse the Service Yaml and populate Service Variables from Serverless instance
 */
import Serverless from 'serverless'
import getServerlessYamlFilePath from './getServerlessYamlFilePath'
import parseYaml from './parseYaml'
import mergeYamlObjects from './yaml/mergeYamlObjects'
import parseYamlAST from './parseYamlAST'

export default function parseServiceYaml(path) {
  // CD into project directory
  process.chdir(path)
  const yamlPath = getServerlessYamlFilePath(path)
  const rawYAML = parseYaml(yamlPath)
  // Parse yamlAST and set Global. Todo: add to state
  parseYamlAST(yamlPath)
  // End AST parse.
  const serverless = new Serverless()
  return serverless.service.load()
    .then(() => {
      // TODO: pass in opts to popluate services https://github.com/serverless/serverless/blob/079c4459cc671fa54837d20015ce9176eee6d7cd/lib/classes/PluginManager.test.js#L218-L225
      const service = serverless.variables.populateService()
      const populatedService = {
        defaults: service.defaults,
        functions: service.functions,
        provider: service.provider,
        resources: service.resources,
        service: service.service,
      }
      // merge raw YAML and variable populated yaml
      return mergeYamlObjects(rawYAML, populatedService)
    })
}
