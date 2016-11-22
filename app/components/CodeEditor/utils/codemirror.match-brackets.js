/* eslint-disable */
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

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
  const ie_lt8 = /MSIE \d/.test(navigator.userAgent) &&
    (document.documentMode == null || document.documentMode < 8)

  const Pos = CodeMirror.Pos

  const matching = { '(': ')>', ')': '(<', '[': ']>', ']': '[<', '{': '}>', '}': '{<' }

  function findMatchingBracket(cm, where, strict, config) {
    let line = cm.getLineHandle(where.line),
      pos = where.ch - 1
    const match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)]
    if (!match) return null
    const dir = match.charAt(1) == '>' ? 1 : -1
    if (strict && (dir > 0) != (pos == where.ch)) return null
    const style = cm.getTokenTypeAt(Pos(where.line, pos + 1))

    const found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style || null, config)
    if (found == null) return null
    return { from: Pos(where.line, pos), to: found && found.pos,
      match: found && found.ch == match.charAt(0), forward: dir > 0 }
  }

  // bracketRegex is used to specify which type of bracket to scan
  // should be a regexp, e.g. /[[\]]/
  //
  // Note: If "where" is on an open bracket, then this bracket is ignored.
  //
  // Returns false when no bracket was found, null when it reached
  // maxScanLines and gave up
  function scanForBracket(cm, where, dir, style, config) {
    const maxScanLen = (config && config.maxScanLineLength) || 10000
    const maxScanLines = (config && config.maxScanLines) || 1000

    const stack = []
    const re = config && config.bracketRegex ? config.bracketRegex : /[(){}[\]]/
    const lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1)
                          : Math.max(cm.firstLine() - 1, where.line - maxScanLines)
    for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
      const line = cm.getLine(lineNo)
      if (!line) continue
      let pos = dir > 0 ? 0 : line.length - 1,
        end = dir > 0 ? line.length : -1
      if (line.length > maxScanLen) continue
      if (lineNo == where.line) pos = where.ch - (dir < 0 ? 1 : 0)
      for (; pos != end; pos += dir) {
        const ch = line.charAt(pos)
        if (re.test(ch) && (style === undefined || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
          const match = matching[ch]
          if ((match.charAt(1) == '>') == (dir > 0)) stack.push(ch)
          else if (!stack.length) return { pos: Pos(lineNo, pos), ch }
          else stack.pop()
        }
      }
    }
    return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null
  }

  function matchBrackets(cm, autoclear, config) {
    // Disable brace matching in long lines, since it'll cause hugely slow updates
    const maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1000
    let marks = [],
      ranges = cm.listSelections()
    for (let i = 0; i < ranges.length; i++) {
      const match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, false, config)
      if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
        const style = match.match ? 'CodeMirror-matchingbracket' : 'CodeMirror-nonmatchingbracket'
        marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), { className: style }))
        if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen) {
          marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), { className: style }))
        }
      }
    }

    if (marks.length) {
      // Kludge to work around the IE bug from issue #1193, where text
      // input stops going to the textare whever this fires.
      if (ie_lt8 && cm.state.focused) cm.focus()

      const clear = function () {
        cm.operation(() => {
          for (let i = 0; i < marks.length; i++) marks[i].clear()
        })
      }
      if (autoclear) setTimeout(clear, 800)
      else return clear
    }
  }

  let currentlyHighlighted = null
  function doMatchBrackets(cm) {
    cm.operation(() => {
      if (currentlyHighlighted) { currentlyHighlighted(); currentlyHighlighted = null }
      currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets)
    })
  }

  CodeMirror.defineOption('matchBrackets', false, (cm, val, old) => {
    if (old && old != CodeMirror.Init) {
      cm.off('cursorActivity', doMatchBrackets)
      if (currentlyHighlighted) { currentlyHighlighted(); currentlyHighlighted = null }
    }
    if (val) {
      cm.state.matchBrackets = typeof val == 'object' ? val : {}
      cm.on('cursorActivity', doMatchBrackets)
    }
  })

  CodeMirror.defineExtension('matchBrackets', function () { matchBrackets(this, true) })
  CodeMirror.defineExtension('findMatchingBracket', function (pos, strict, config) {
    return findMatchingBracket(this, pos, strict, config)
  })
  CodeMirror.defineExtension('scanForBracket', function (pos, dir, style, config) {
    return scanForBracket(this, pos, dir, style, config)
  })
}))
