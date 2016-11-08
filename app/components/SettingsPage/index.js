import React from 'react'
// import { Link } from 'react-router'
import Layout from '../Layout'
import Button from '../Button'
import styles from './SettingPage.css'
// import AddCredentials from '../AddCredentials'

export default class Settings extends React.Component {
  handleReset = () => {
    window.localStorage.removeItem('services')
    alert('Shut down and restart the app')
  }
  render() {
    const content = (
      <div className={styles.settings}>
        <h3>Settings</h3>
        <p>More settings are coming soon...</p>
        <p>Drop us a note in the feedback/feature request section if you want something specific =)</p>
        <hr />
        <div className={styles.reset} >
          <h3>Troubleshooting</h3>
          <h4>Reset App to fresh state</h4>
          <p><b>Warning:</b> this will remove all services from the service list page</p>
          <p>This will <b>not</b> remove files/folder from your computer </p>
          <Button onClick={this.handleReset}>Reset App to refresh state + restart</Button>
        </div>
      </div>
    )
    return <Layout content={content} />
  }
}
