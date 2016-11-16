import fs from 'fs'
import yaml from 'js-yaml'

/* Parse yaml to check for variables */
export default function parseYaml(ymlPath) {
  try {
    return yaml.safeLoad(fs.readFileSync(ymlPath, 'utf8'))
  } catch (e) {
    return e
  }
}
