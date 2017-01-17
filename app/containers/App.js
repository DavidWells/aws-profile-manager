import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { shell } from 'electron'
import Logo from '../../static/images/bolt.svg'
import styles from './App.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };
  constructor(props, context) {
    super(props, context)
    this.state = {
      update: false
    }
  }
  handleDownload = (e) => {
    e.preventDefault()
    shell.openExternal('https://github.com/DavidWells/aws-profile-manager')
  }
  render() {
    // const { update } = this.state
    return (
      <div className={styles.app}>
        <div className={styles.navigationWrapper}>
          <div className={styles.navigationBumper} />
          <div className={styles.navigationFixed}>
            <div className={styles.leftNav}>
              <Link to='/'>
                <div className={styles.logo}>
                  <img src={Logo} role='presentation' />
                </div>
              </Link>
            </div>
            <div className={styles.middleNav}>
              <h2>Unofficial AWS Profile Manager</h2>
            </div>
            <div className={styles.rightNav}>
              {/* empty */}
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
