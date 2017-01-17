import React, { Component } from 'react'
import { shell } from 'electron'
import styles from './AddCredentials.css'

class AddCredentials extends Component {

  state = {
    profile: 'default',
    awsAccessKeyId: '',
    awsSecretAccessKey: '',
  }

  updateProfile = (evt) => { this.setState({ awsAccessKeyId: evt.target.value }) }

  updateAwsAccessKeyId = (evt) => { this.setState({ awsAccessKeyId: evt.target.value }) }

  updateAwsSecretAccessKey = (evt) => { this.setState({ awsSecretAccessKey: evt.target.value }) }

  addCredentials = () => {
    this.props.addCredentials({
      profile: 'default',
      awsAccessKeyId: this.state.awsAccessKeyId,
      awsSecretAccessKey: this.state.awsSecretAccessKey,
    })
  }

  render() {
    const consoleLink = 'https://console.aws.amazon.com/console/home'
    return (
      <div className={styles.wrapper}>
        <h2>Welcome to the AWS credentials manager</h2>

        <p>
          It looks like you don't have any AWS credentials on your computer.
        </p>

        <p style={{ marginBottom: 20 }}>
          <a
            onClick={(e) => { e.preventDefault(); shell.openExternal(consoleLink) }}
            href='https://console.aws.amazon.com/console/home'
            className={styles.link}
          >
            Login to your AWS account
          </a> and follow the video below to get started
        </p>
        <div className={styles.playerWrapper}>
          <div className={styles.player}>
            <div className={styles.videoWrapper}>
              <div className={styles.video}>
                <iframe src='https://player.vimeo.com/video/190626782?title=0&byline=0&portrait=0' width='450' height='281' frameBorder='0' webkitallowfullscreen mozallowfullscreen allowFullScreen />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.field} style={{ display: 'none' }}>
          <input
            type='text'
            placeholder='Profile'
            onChange={this.updateProfile}
            value={this.state.profile}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='Access'>AWS Access Key ID</label>
          <input
            id='Access'
            type='text'
            placeholder='Enter Your AWS Access Key ID'
            onChange={this.updateAwsAccessKeyId}
            value={this.state.awsAccessKeyId}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='Secret'>AWS Secret Key</label>
          <input
            id='Secret'
            type='text'
            placeholder='Enter Your AWS Secret Access Key'
            onChange={this.updateAwsSecretAccessKey}
            value={this.state.awsSecretAccessKey}
          />
        </div>
        <button
          className={styles.createButton}
          onClick={this.addCredentials}
          disabled={!this.state.profile || !this.state.awsAccessKeyId || !this.state.awsSecretAccessKey}
        >
          Save
        </button>
      </div>
    )
  }
}

export default AddCredentials
