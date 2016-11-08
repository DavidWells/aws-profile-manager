import React, { PropTypes } from 'react'
import Sidebar from '../Sidebar'
import styles from './Layout.css'

const Layout = (props) => {
  const detailPane = (
    <div className={styles.detailPane}>
      {props.detailPane}
    </div>
  )

  return (
    <div className={styles.wrapper}>
      {props.sidebar && <Sidebar>{props.sidebar}</Sidebar>}
      <div className={styles.content}>
        {props.content}
      </div>
      {props.detailPane && detailPane}
    </div>
  )
}

Layout.propTypes = {
  sidebar: PropTypes.element,
  content: PropTypes.element,
  detailPane: PropTypes.element
}

export default Layout
