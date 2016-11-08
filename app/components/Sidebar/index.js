import React, { PropTypes } from 'react'
import styles from './Sidebar.css'

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.contents}>
        {props.children}
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
}

export default Sidebar
