import React, { PropTypes } from 'react'
import { shell } from 'electron'
import Card from '../Card'
import docHelpers from '../../constants/awsLinks'
import styles from './Resources.css'

const displayValue = (value) => {
  if (Array.isArray(value)) {
    return 'data coming soon'
  } else if (typeof value === 'object') {
    return 'data coming soon'
  }
  return value
}

const renderItems = (resourceProps) => {
  return Object.keys(resourceProps).map((item, j) => {
    let docLink
    if (docHelpers[item]) {
      docLink = (
        <a
          title={`View the ${item} docs`}
          className={styles.helpLink}
          href={docHelpers[item]}
          onClick={(e) => { e.preventDefault(); shell.openExternal(docHelpers[item]) }}
        >
          <i className='fa fa-info-circle' aria-hidden='true' />
        </a>
      )
    }
    return (
      <Card key={j}>
        <div>
          {item}{docLink}
        </div>
        <div>
          {displayValue(resourceProps[item])}
        </div>
      </Card>
    )
  })
}

const Resources = ({ resources }) => {
  let resourcesItems = (
    <div>
      No resources defined. Open your serverless.yml file to add some!
    </div>
  )
  if (resources) {
    resourcesItems = Object.keys(resources.Resources).map((name) => {
      return {
        name,
        info: resources.Resources[name]
      }
    }).map((resource, i) => {
      const resourceInfo = resources.Resources[resource.name]
      const items = renderItems(resourceInfo.Properties)
      return (
        <div key={i} className={styles.singleResources}>
          {items}
        </div>
      )
    })
  }
  return (
    <div>
      <h3>Resources</h3>
      {resourcesItems}
    </div>
  )
}

Resources.propTypes = {
  resources: PropTypes.object
}

export default Resources
