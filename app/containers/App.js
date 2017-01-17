import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { shell } from 'electron'
import Logo from '../../static/images/bolt.svg'
import checkForUpdates from '../utils/checkForUpdates'
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
  componentDidMount() {
    checkForUpdates().then((data) => {
      console.log('check', data)
      if (data.version) {
        this.setState({
          update: data
        })
        // eslint-disable-next-line no-console
        console.log('version out of date!')
        // eslint-disable-next-line no-console
        console.log('new version data', data)
        // do update alert
      }
    })
  }
  handleDownload = (e) => {
    e.preventDefault()
    shell.openExternal('http://bit.ly/serverless-dashboard')
  }
  render() {
    const { update } = this.state
    let updateText
    if (update) {
      updateText = (
        <div className={styles.update} onClick={this.handleDownload}>
          🎉 Good news. An update is available! <b>Click to Download v{update.version} 🚀</b>
        </div>
      )
    }
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

            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
