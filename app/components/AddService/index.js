import React, { Component, PropTypes } from 'react'
import Button from '../Button'
import walkDirSync from '../../utils/walkDirSync'
import selectDirectory from '../../utils/selectDirectory'
import slugify from '../../utils/slugify'
import getServerlessYamlFilePath from '../../utils/getServerlessYamlFilePath'
import parseServiceYaml from '../../utils/parseServiceYaml'
import mergeYamlObjects from '../../utils/yaml/mergeYamlObjects'
import parseYaml from '../../utils/parseYaml'
import styles from './AddService.css'

class AddScreen extends Component {

  static propTypes = {
    services: PropTypes.object,
    addService: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  openService = () => {
    // TODO verify that the user doesn't open the same directory twice
    const directories = selectDirectory()
    if (directories && directories.length) {
      const servicePath = directories[0]
      const filePaths = walkDirSync(servicePath)
      const yamlPath = getServerlessYamlFilePath(servicePath)
      const rawYAML = parseYaml(yamlPath)
      parseServiceYaml(servicePath).then((data) => {
        const id = slugify(servicePath)
        // traverse both yaml objects and add variable sources
        const merge = mergeYamlObjects(rawYAML, data)
        this.props.addService(
          {
            id,
            filePaths,
            config: merge,
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
