import React, { PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Button.css'

const Button = ({ className, children, ...otherProps }) => (
  <button {...otherProps} className={classnames(styles.button, className)}>
    {children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default Button
