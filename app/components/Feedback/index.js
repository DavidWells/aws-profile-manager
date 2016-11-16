import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import axios from 'axios'
import Logo from '../../../static/images/serverless_logo.png'
import Button from '../Button'
import styles from './Feedback.css'

const propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool,
}

export default class Feedback extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      active: false, // intially always starts closed
      requestInProgess: false
    }
    this.handleEscKey = this.handleEscKey.bind(this)
  }
  componentWillUnmount() {
    this.removeKeyBinding()
  }
  attachKeyBinding() {
    if (!this.escKeyListener) {
      this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey)
    }
  }
  removeKeyBinding() {
    document.body.removeEventListener('keydown', this.handleEscKey)
    this.escKeyListener = null
  }
  handleEscKey(e) {
    if (this.state.active && e.which === 27) {
      this.handleClose()
      this.removeKeyBinding()
    }
  }
  handleClose = () => {
    this.setState({
      active: false
    }, () => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    })
  }
  handleOpen = () => {
    this.attachKeyBinding()
    this.setState({
      active: true
    }, () => {
      if (this.props.onOpen) {
        this.props.onOpen()
      }
      this.refs.feedback.focus()
    })
  }
  handleSubmit = () => {
    this.setState({
      requestInProgess: true,
    })
    axios.post('https://mi4jlrknm7.execute-api.us-west-2.amazonaws.com/dev/submit', {
      email: this.refs.email.value,
      message: this.refs.feedback.value,
      route: window.location.hash
    })
    .then((response) => {
      console.log(response)
      this.setState({
        requestInProgess: false,
      }, () => {
        this.refs.email.value = ''
        this.refs.feedback.value = ''
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render() {
    const { style } = this.props
    const { requestInProgess } = this.state
    const showOrHide = (this.state.active) ? styles.active : null
    const classes = classnames(
      styles.feedbackContent, // base class
      styles.borders,
      showOrHide
    )
    const buttonText = (requestInProgess) ? 'Sending...' : 'Submit Feedback / Feature request'

    return (
      <div ref='slideIn' className={styles.feedbackWrapper} style={style}>
        <div className={`${styles.toggle} ${styles.borders}`} onClick={this.handleOpen}>
          <i className='fa fa-comment-o' aria-hidden='true' />
          <span>Feedback & Feature Requests</span>
        </div>
        <div className={classes}>
          <div className={styles.heading} onClick={this.handleClose}>
            <img src={Logo} role='presentation' />
          </div>
          <div className={styles.form}>
            <p>We love hearing from you!</p>
            <textarea
              className={styles.textarea}
              placeholder='Enter your feedback or feature request here'
              ref='feedback'
            />
            <input
              placeholder='email (optional)'
              className={styles.email}
              ref='email'
            />
            <Button className={styles.submitButton} onClick={this.handleSubmit}>
              {buttonText}
            </Button>
          </div>
          <span className={`${styles.close}`} onClick={this.handleClose} />
        </div>
      </div>
    )
  }
}

Feedback.propTypes = propTypes
