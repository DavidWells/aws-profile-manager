import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Logo from '../../static/images/bolt.svg'
import Feedback from '../components/Feedback'
import SettingsIcon from '../../static/images/settings.svg'
import styles from './App.css'

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
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
              <Link to='/'>Services</Link>
            </div>
            <div className={styles.rightNav}>
              <Link className={styles.settings} to='/settings'>
                <img src={SettingsIcon} role='presentation' />
              </Link>
            </div>
          </div>
        </div>
        {this.props.children}
        <Feedback />
      </div>
    )
  }
}
