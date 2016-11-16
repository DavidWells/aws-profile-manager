import fs from 'fs'
import parseYamlAST from '../parseYamlAST'

/* Updates yaml text based on YAML AST Node */
export default function updateYamlFileValue(newText, node, ymlPath) {
  try {
    let theNode = node
    const currentContents = fs.readFileSync(ymlPath, 'utf8')
    if (!Object.hasOwnProperty.call(node, 'value')) {
      theNode = node.parent.key
    }
    const newContents = replaceYMLValue(newText, theNode, currentContents)
    fs.writeFileSync(ymlPath, newContents)
    // reset Window AST data
    parseYamlAST(ymlPath) // TODO: refactor and make state
    return newContents
  } catch (e) {
    return e
  }
}

function replaceYMLValue(newText, node, contents) {
  const { startPosition, endPosition } = node
  if (!startPosition || !endPosition) {
    return contents
  }
  const beginning = contents.substring(0, startPosition)
  const end = contents.substring(endPosition, contents.length)
  return `${beginning}${newText}${end}`
}
