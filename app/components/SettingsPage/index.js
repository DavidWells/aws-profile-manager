import React from 'react'
import { Link } from 'react-router'
import { ipcRenderer, remote } from 'electron'
import Layout from '../Layout'
import Button from '../Button'
import getAppVersion from '../../utils/electron/getAppVersion'
import styles from './SettingPage.css'
// import AddCredentials from '../AddCredentials'
ipcRenderer.on('debugFromRestartMain', (e, arg) => {
  /* this is hack to reload app... */
  remote.getCurrentWindow().reload()
})
export default class Settings extends React.Component {
  handleReset = () => {
    window.localStorage.removeItem('services')
    console.log('RESET Triggered')
    /* this restart works in dev but not in prod */
    ipcRenderer.send('reset-and-restart-app', 'BOOM')
  }
  render() {
    const content = (
      <div className={styles.settings}>
        <h3>Settings</h3>
        <h5>Current app version: {getAppVersion}</h5>
        <Button style={{ width: 300 }}>
          <Link style={{ color: 'black' }} to='/manage-credentials'>Mange AWS profiles</Link>
        </Button>
        <p>More settings are coming soon...</p>
        <p>Drop us a note in the feedback/feature request section if you want something specific =)</p>
        <hr />
        <div className={styles.reset} >
          <h3>Troubleshooting</h3>
          <h4>Reset App to fresh state</h4>
          <p><b>Warning:</b> this will remove all services from the service list page</p>
          <p>This will <b>not</b> remove files/folder from your computer </p>
          <Button onClick={this.handleReset}>
            Reset App to refresh state and restart application
          </Button>
        </div>
      </div>
    )
    return <Layout content={content} />
  }
}
