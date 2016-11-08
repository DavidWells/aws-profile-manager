import React, { Component, PropTypes } from 'react'
import Button from '../Button'
// import { uniqueId } from 'lodash'
import walkDirSync from '../../utils/walkDirSync'
import selectDirectory from '../../utils/selectDirectory'
import parseServiceYaml from '../../utils/parseServiceYaml'
import styles from './AddService.css'

class AddScreen extends Component {

  static propTypes = {
    services: PropTypes.object.isRequired,
    addService: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  openService = () => {
    // TODO verify that the user doesn't open the same directory twice
    const directories = selectDirectory()
    if (directories && directories.length) {
      const servicePath = directories[0]
      const filePaths = walkDirSync(servicePath)
      parseServiceYaml(servicePath).then((data) => {
        const id = servicePath.replace(/\//g, '_')
        this.props.addService(
          {
            id,
            filePaths,
            config: data,
            projectPath: servicePath,
          },
          this.props.credentials
        )
        this.props.history.push(`service/${id}`)
      })
    }
  }

  createService = () => {
    this.props.history.push('service/create')
  }

  render() {
    return (
      <div className={styles.addService}>
        <Button onClick={this.openService} className={styles.button}>
          Open existing Service
        </Button>
        <Button onClick={this.createService} className={styles.button}>
          Create a new Service
        </Button>
      </div>
    )
  }
}

export default AddScreen
