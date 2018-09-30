import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Overlay.css'
import Portal from '../Portal'

export default class Overlay extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    invisible: PropTypes.bool,
    onClick: PropTypes.func,
    onEscKeyDown: PropTypes.func,
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount() {
    if (this.props.active) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this))
      this.disableScroll()
      // document.body.style.overflow = 'hidden'
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.active && !this.props.active) {
      // document.body.style.overflow = 'hidden'
      this.disableScroll()
    }
    if (!nextProps.active && this.props.active) {
      this.enableScroll()
      // document.body.style.overflow = null
    }
  }

  componentDidUpdate() {
    if (this.props.active && !this.escKeyListener) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this))
    }
  }

  componentWillUnmount() {
    // document.body.style.overflow = null
    this.enableScroll()
    if (this.escKeyListener) {
      document.body.removeEventListener('keydown', this.handleEscKey)
      this.escKeyListener = null
    }
  }
  preventDefault = (e) => {
    const event = e || window.event
    if (event.preventDefault) {
      event.preventDefault()
    }
    event.returnValue = false
  }
  disableScroll() {
    if (window.addEventListener) {
      // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false)
    }
    window.onwheel = this.preventDefault // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault // older browsers, IE
    window.ontouchmove = this.preventDefault // mobile
    document.onkeydown = this.preventDefaultForScrollKeys
  }
  preventDefaultForScrollKeys(e) {
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
    if (keys[e.keyCode]) {
      this.preventDefault(e)
      return false
    }
  }
  enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
    }
    window.onmousewheel = document.onmousewheel = null
    window.onwheel = null
    window.ontouchmove = null
    document.onkeydown = null
  }
  handleEscKey(e) {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e)
    }
  }

  render() {
    const { active, className, children, invisible, onClick } = this.props
    const _className = classnames(styles.overlay, {
      [styles.active]: active,
      [styles.invisible]: invisible
    }, className)

    return (
      <Portal>
        <div className={_className}>
          <div className={styles.backdrop} onClick={onClick} />
          {children}
        </div>
      </Portal>
    )
  }
}