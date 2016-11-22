import React, { PropTypes, Component } from 'react'
import CodeMirror from 'codemirror'
import jsonLint from './utils/json-lint' // eslint-disable-line
import CodeMirrorJS from './utils/codemirror.javascript' // eslint-disable-line
import codeMirrorLint from './utils/codemirror.lint' // eslint-disable-line
import codeMirrorJsonLint from './utils/codemirror.json-lint' // eslint-disable-line
import codeMirrorActiveLine from './utils/codemirror.active-line' // eslint-disable-line
import codeMirrorMatchBrackets from './utils/codemirror.match-brackets' // eslint-disable-line
import codeMirrorStyles from './styles.global.css' // eslint-disable-line
import lintStyles from './styles.lint.global.css' // eslint-disable-line

const propTypes = {
  code: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
}

export default class CodeEditor extends Component {
  componentDidMount() {
    // this.originalCode = this.props.code
    const node = this.refs.editor
    this.editor = CodeMirror.fromTextArea(node, {
      mode: 'application/json',
      lineNumbers: false,
      styleActiveLine: true,
      lineWrapping: true,
      smartIndent: true,
      matchBrackets: true,
      theme: 'dracula',
      scrollbarStyle: null,
      viewportMargin: Infinity,
      dragDrop: false,
      lint: true,
      // gutters: ["CodeMirror-lint-markers"],
      readOnly: this.props.readOnly
    })
    this.editor.on('change', this.handleChange)
    this.editor.on('beforeSelectionChange', (instance, obj) => {
      const selection = (obj.ranges) ? obj.ranges[0] : obj
      const noRange = selection.anchor.ch === selection.head.ch &&
                        selection.anchor.line === selection.head.line
      if (!noRange) {
        return
      }
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }
  handleChange = () => {
    const { onChange } = this.props
    if (onChange) {
      onChange(this.editor.getValue())
    }
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        <textarea ref='editor' defaultValue={this.props.code} />
      </div>
    )
  }
}

CodeEditor.propTypes = propTypes
