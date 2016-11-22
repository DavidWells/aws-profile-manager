/*eslint-disable */

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on jsonlint.js from https://github.com/zaach/jsonlint
// var jsonlint = require("./jsonlint");
// declare global: jsonlint

(function (mod) {
  if (typeof exports == 'object' && typeof module == 'object') // CommonJS
    {
    mod(require('codemirror'))
  } else if (typeof define == 'function' && define.amd) // AMD
    {
    define(['codemirror'], mod)
  } else // Plain browser env
    {
    mod(CodeMirror)
  }
}((CodeMirror) => {
  CodeMirror.registerHelper('lint', 'json', (text) => {
    const found = []
    jsonlint.parseError = function (str, hash) {
      const loc = hash.loc
      found.push({ from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
        to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
        message: str })
    }
    try {
      jsonlint.parse(text)
    } catch (e) {

    }
    return found
  })
}))
