import React, { Component } from 'react'
import { connect } from 'react-redux'
import fixPath from 'fix-path'
import Select from 'react-select'
import Layout from '../components/Layout'
import Button from '../components/Button'
import styles from './CreateService.css'
// import { uniqueId } from 'lodash'
import createDirectory from '../utils/createDirectory'
import addService from '../actions/addService'
import walkDirSync from '../utils/walkDirSync'
import parseServiceYaml from '../utils/parseServiceYaml'
import getServerlessCMDPath from '../utils/serverless/getServerlessCMDPath'
import spawn from '../utils/child_process/betterSpawn'

const mapStateToProps = (state) => {
  return {
    services: state.services,
    credentials: state.credentials,
  }
}

// TODO import this list from the framework
const templates = [
  { value: 'aws-nodejs', label: 'aws-nodejs' },
  { value: 'aws-python', label: 'aws-python' },
  { value: 'aws-java-maven', label: 'aws-java-maven' },
  { value: 'aws-java-gradle', label: 'aws-java-gradle' },
  { value: 'aws-scala-sbt', label: 'aws-scala-sbt' },
]

class CreateService extends Component {

  state = {
    name: '',
    directory: null,
    template: templates[0].value,
  }

  updateName = (evt) => { this.setState({ name: evt.target.value }) }

  selectDirectory = () => {
    // TODO verify that the user doesn't open the same directory twice
    const directories = createDirectory()
    if (directories && directories.length) {
      // TODO verify this directory doesn't contain a serverless service already
      this.setState({
        directory: directories[0],
      })
    } else {
      console.error('Error: couldn\'t open the directory. or cancel clicked')
    }
  }

  selectTemplate = (option) => {
    console.log(option)
    this.setState({
      template: option.value,
    })
  }

  createService = () => {
    if (!this.state.directory) {
      alert('Please select a directory!')
      return false
    }

    if (!this.state.name) {
      alert('Enter a name for your service in step 2')
      return false
    }

    if (!this.state.template) {
      alert('Please select a template!')
      return false
    }
    if (process.env.NODE_ENV !== 'development') {
      fixPath()
    }
    const servicePath = this.state.directory
    const args = [
      'create',
      '--template', `${this.state.template}`,
      '--name', `${this.state.name}`
    ]
    let slsCommand
    try {
      const options = {
        cwd: servicePath,
        env: process.env
      }
      const serverlessCMDPath = getServerlessCMDPath()
      slsCommand = spawn(serverlessCMDPath, args, options)
    } catch (error) {
      if (error && error.stdout == null) {
        error.stdout = ''
      }
      process.nextTick(() => {
        console.warn(error)
        // if (callback) {
        //   callback(error)
        // }
      })
      return
    }
    slsCommand.on('close', (code) => {
      if (code !== 0) {
        // TODO track with sentry
        console.error('Failed to create the service')
        return
      }
      const filePaths = walkDirSync(servicePath)
      parseServiceYaml(servicePath).then((data) => {
        const id = servicePath.replace(/\//g, '_')
        this.props.addService(
          {
            id,
            filePaths,
            name: this.state.name,
            config: data,
            projectPath: servicePath,
            credentials: this.props.credentials,
          },
          this.props.credentials
        )
        this.props.history.push(`service/${id}`)
      })
    })
  }

  render() {
    const content = (
      <div className={styles.wrapper}>
        <h1>Create a Service</h1>
        <div className={styles.field}>
          <label htmlFor='directory'>1. Choose a directory to install your service</label>
          <div>
            <Button className={styles.openButton} type='button' onClick={this.selectDirectory}>
              Choose directory
            </Button>
            {this.state.directory && <span className={styles.installDir}> {this.state.directory}</span>}
          </div>

        </div>
        <div className={styles.field}>
          <label htmlFor='name'>2. Choose a service name</label>
          <input
            id='name'
            type='text'
            placeholder='your-service-name-with-dashes'
            value={this.state.name}
            onChange={this.updateName}
          />
        </div>
        <div className={`${styles.select} ${styles.field}`}>
          <label htmlFor='template'>3. Pick a Template</label>
          <Select
            options={templates}
            onChange={this.selectTemplate}
            value={this.state.template}
            clearable={false}
          />
        </div>
        <div className={styles.createButton}>
          <Button
            type='button'
            onClick={this.createService}
          >
            Create Service
          </Button>
        </div>
      </div>
    )
    return <Layout content={content} />
  }
}

export default connect(mapStateToProps, {
  addService,
})(CreateService)
