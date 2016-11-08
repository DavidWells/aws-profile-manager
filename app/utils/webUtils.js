

module.exports = {
  // disable backspace unless in input
  disableGlobalBackspace() {
    document.onkeydown = (event) => {
      const e = event || window.event
      let doPrevent
      if (e.keyCode === 8) {
        const d = e.srcElement || e.target
        if (d.tagName.toUpperCase() === 'INPUT' || d.tagName.toUpperCase() === 'TEXTAREA') {
          doPrevent = d.readOnly || d.disabled
        } else {
          doPrevent = true
        }
      } else {
        doPrevent = false
      }
      if (doPrevent) {
        e.preventDefault()
      }
    }
  },
}
