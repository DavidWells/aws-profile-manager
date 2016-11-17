import fs from 'fs'
import yaml from 'yaml-ast-parser'
/*eslint-disable */
/**
 * TODO: Make pure functions
 */
// this -> functions.FourOhFourTracker.events.http
// needs to be -> functions.FourOhFourTracker.events[0].http.method
/*
array items is kind: 3
Value is object kind is: 2
ITEM key = kind 1 // top level key kind is: 1
String value is kind: 0
*/


let lineNumbers
/* Parse yaml to check for variables */
export default function parseYamlAST(ymlPath) {
  try {
    const contents = fs.readFileSync(ymlPath, 'utf8')
    lineNumbers = [] // reset current AST line Numbers array
    window.CURRENT_AST = {} // reset current AST
    window.CURRENT_AST.PATH = ymlPath
    lineNumbers = getLineNumberInfo(contents)
    // console.log('lineNumbers', lineNumbers)

    const yamlAST = yaml.load(contents)
    const nullYamlValues = []
    const valueWithParent = []
    parseAST(yamlAST, valueWithParent, nullYamlValues)
    // console.log('nullYamlValues', nullYamlValues)
    // console.log('valueWithParent', valueWithParent)
    // console.log(window.CURRENT_AST)

    // TODO: Validate Yaml Fields
    // validateYamlFields(valueWithParent)
    return yamlAST
  } catch (e) {
    return e
  }
}
let globalCount = 0 // global array counter for normalization. TODO: refactor
function parseAST(ast, valueWithParent, nullValues) {
  if (!ast) {
    nullValues.push(astError('Empty Node', -1))
    return
  }
  if (Object.hasOwnProperty.call(ast, 'mappings')) {
    const chainKey = findParentChain(ast)
    const chain = (!chainKey) ? 'AST' : chainKey
    window.CURRENT_AST[chain] = ast
    // array of objects
    ast.mappings.forEach((each) => {
      return parseAST(each, valueWithParent, nullValues)
    })
  } else if (Object.hasOwnProperty.call(ast, 'items')) {
    const chain = findParentChain(ast)
    window.CURRENT_AST[chain] = ast
    // add lineNumber for reference
    window.CURRENT_AST[chain].lineNumber = getLineNumber(
      ast.startPosition,
      ast.endPosition,
      lineNumbers
    )
    // reset global array count
    globalCount = -1
    // iterate through item array
    ast.items.forEach((each) => {
      globalCount++ // increment global array pointer
      return parseAST(each, valueWithParent, nullValues)
    })
  } else if (Object.hasOwnProperty.call(ast, 'value')) {
    if (!ast.value) {
      // null case
      const lineNumber = getLineNumber(ast.startPosition, ast.endPosition, lineNumbers)
      nullValues.push(astError('Empty Propety', lineNumber))
      return
    }
    if (typeof ast.value === 'string') {
      // console.log('parent', ast.parent.key.value)
      // console.log('value', ast.value)
      // console.log('value obj', ast)
      const chain = findParentChain(ast)
      window.CURRENT_AST[chain] = ast
      // add lineNumber for reference
      window.CURRENT_AST[chain].lineNumber = getLineNumber(ast.startPosition, ast.endPosition, lineNumbers)
      // record the node with real yaml values here. to save from another after null check. aka, do both together.
      valueWithParent.push(ast)
      return
    }
    return parseAST(ast.value, valueWithParent, nullValues)
  }
}

function getLineNumberInfo(contents) {
  const lineBreakRegex = /(\r\n)|(\n)|(\r)/g
  const fileLineArray = contents.split(/\r\n|\n|\r/)
  const lineBreakCharactorLengthArray = []
  let lineBreakmatch = lineBreakRegex.exec(contents)
  while (lineBreakmatch) {
    lineBreakCharactorLengthArray.push(lineBreakmatch[0].length)
    lineBreakmatch = lineBreakRegex.exec(contents)
  }
  let currentLineFirstCharAt = 0
  for (let i = 0; i < fileLineArray.length; i++) {
    const lineLength = fileLineArray[i].length
    lineNumbers.push([currentLineFirstCharAt, currentLineFirstCharAt + lineLength])
    currentLineFirstCharAt = currentLineFirstCharAt + lineLength + lineBreakCharactorLengthArray[i]
  }
  return lineNumbers
}

function getLineNumber(start, end, lineNumberArray) {
  if (start && end) {
    for (let j = 0; j < lineNumberArray.length; j++) {
      if (start >= lineNumberArray[j][0] && end <= lineNumberArray[j][1]) {
        return j + 1
      }
    }
  }
  return -1
}

function astError(message, lineNumber) {
  const resultJson = {
    Severity: 'Error',
    Message: message
  }
  if (lineNumber !== -1) {
    resultJson.Line = lineNumber
  }
  return { message, data: resultJson }
}

function findclosestKeyName(valueNode, realParentNode) {
  const baz = realParentNode
  if (Object.hasOwnProperty.call(valueNode, 'key')) {
    baz.nodeKey = valueNode.key.value
    baz.node = valueNode
    return
  }
  findclosestKeyName(valueNode.parent, baz)
}

function findclosestParentKeyName(valueNode) {
  if (Object.hasOwnProperty.call(valueNode.parent, 'key')) {
    return valueNode.parent.key.value
  }
  findclosestParentKeyName(valueNode.parent)
}

function findParentChain(node, kind) {
  const chain = []

  while (node.parent) {
    if (node.parent.key && node.parent.key.value) {
      let val = node.parent.key.value
      if (node.kind === 3) {
        // console.log(`ARRAY NODE. key ${node.parent.key.value}`, node)
        // console.log('global globalCount', globalCount)
        val = `${node.parent.key.value}[${globalCount}]`
      }
      chain.push(val)
    }
    node = node.parent // eslint-disable-line
  }
  return chain.reverse().join('.')
}

/*
function validateYamlFields(valueWithParent) {
  for (let m = 0; m < valueWithParent.length; m++) {
    console.log(valueWithParent[m])
    const realParentNode = { nodeKey: '', node: {} }
    findclosestKeyName(valueWithParent[m], realParentNode)
    console.log('realParentNode', realParentNode)
    // allValues[realParentNode.nodeKey] = realParentNode
    console.log('key:value', `${realParentNode.nodeKey}: ${valueWithParent[m].value}`)
    switch (realParentNode.nodeKey) {
      case 'exclude':
        if (isStringProperty(realParentNode.node)) {
          console.log('Exclude validation failed not an array')
        }
        break
      case 'service':
        if (!isStringProperty(realParentNode.node)) {
          console.log('service is not string and it needs to be')
        }
        break
    }
  }
}

function updateFieldByKey(valueWithParent) {
  const test = valueWithParent.filter((node) => {
    const realParentNode = { nodeKey: '', node: {} }
    findclosestKeyName(node, realParentNode)
    const lol = findclosestParentKeyName(node)
    console.log(`closest key ${lol}`, node)
    if (node.value === 'Retain' && realParentNode.nodeKey === 'DeletionPolicy') {
      var what = findParentChain(node)
      console.log('parent chain', what)
      console.log('ParentNode', realParentNode)
      if (realParentNode.node.parent && realParentNode.node.parent.parent) {
        console.log(realParentNode.node.parent.parent)
        console.log(realParentNode.node.parent.parent.key.value)
      }
      return node
    }
  })
}

function isStringProperty(parentNode) {
  if (Object.hasOwnProperty.call(parentNode.value, 'value') &&
    typeof parentNode.value.value === 'string'
    ) {
    return true
  }
  return false
}
*/

function isValidNonNegativeProperty(value) {
  if (/^[1-9][0-9]*/.test(value)) {
    return true
  }
  return false
}
