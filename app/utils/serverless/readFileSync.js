/*
Will be a functional replacement for https://github.com/serverless/serverless/blob/master/lib/classes/Utils.js
 */
/*eslint-disable */
const BbPromise = require('bluebird')
const fse = BbPromise.promisifyAll(require('fs-extra'))
const YAML = require('js-yaml')

export default function readFileSync(filePath) {
  let contents

  // Read file
  contents = fse.readFileSync(filePath)

  // Auto-parse JSON
  if (filePath.endsWith('.json')) {
    contents = JSON.parse(contents)
  } else if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
    contents = YAML.load(contents.toString(), { filename: filePath })
  } else {
    contents = contents.toString().trim()
  }

  return contents
}
