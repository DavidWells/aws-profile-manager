import React, { PropTypes } from 'react'
import classnames from 'classnames'
import styles from './Card.css'

const Card = ({ className, children }) => {
  return (
    <div className={classnames(styles.card, className)}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default Card
