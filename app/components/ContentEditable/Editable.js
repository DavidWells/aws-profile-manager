/* fork of https://github.com/lovasoa/react-contenteditable */
import React from 'react'

export default class Editable extends React.Component {
  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      !this.htmlEl
      // ...or if html really changed... (programmatically, not by user edit)
      || (nextProps.html !== this.htmlEl.innerHTML
        && nextProps.html !== this.props.html)
      // ...or if editing is enabled or disabled.
      || this.props.disabled !== nextProps.disabled
    )
  }
  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html
    }
  }
  emitChange = (evt) => {
    if (evt.which === 13) {
      evt.preventDefault()
      return false
    }
    if (!this.htmlEl) return
    const html = this.htmlEl.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target.value = html // eslint-disable-line
      this.props.onChange(evt)
    }
    this.lastHtml = html
  }
  render() {
    const { tagName, html, onChange, ...props } = this.props // eslint-disable-line

    return React.createElement(// eslint-disable-line
      tagName || 'div',
      {
        ...props,
        ref: (e) => this.htmlEl = e, // eslint-disable-line
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      },
      this.props.children)
  }
}
