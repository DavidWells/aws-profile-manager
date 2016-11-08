import React, { Component, PropTypes } from 'react'
((window.gitter = {}).chat = {}).options = {
  room: 'serverless'
}

const propTypes = {
  children: PropTypes.any
}
export default class Chat extends Component {
  componentDidMount() {
    if (document.getElementsById('gitter')) {
      /* script already loaded */
      return false
    }
    const s = document.getElementsByTagName('script')[0]
    const el = document.createElement('script')
    el.type = 'text/javascript'
    el.async = true
    el.src = 'https://sidecar.gitter.im/dist/sidecar.v1.js'
    el.id = 'gitter'
    el.addEventListener('load', (_e) => {
      console.log('gitter loaded')
    }, false)
    return s.parentNode.insertBefore(el, s)
  }
  render() {
    return (
      <div>Chat</div>
    )
  }
}

Chat.propTypes = propTypes
