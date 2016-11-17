import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { shell } from 'electron'
import ServiceValue from '../../containers/ServiceValue'
import Card from '../Card'
import Button from '../Button'
import styles from './FunctionList.css'

const FunctionList = (props) => {
  const service = props.service

  const functionRender = map(service.config.functions, (func, functionName) => {
    if (!func.handler) {
      return (
        <div>Function has no handler. One needs to be added</div>
      )
    }
    const serviceLanguage = getLanguage(service)
    let functionFilePath = func.handler // default of long path name
    if (!func.handler.match(/\//)) {
      functionFilePath = `${service.projectPath}/${func.handler.split('.')[0]}.${serviceLanguage}`
    }
    let functionEvents = (
      <div>No events registered for this function</div>
    )
    if (func.events && func.events.length) {
      functionEvents = func.events.map((event, i) => {
        const eventDisplay = Object.keys(event).map((eventType, j) => {
          // console.log('event', event)
          // console.log('event[eventType]', event[eventType])
          // console.log('typeof event[eventType]', typeof event[eventType])
          let eventValues = event[eventType]
          const fromVar = event[`${eventType}_var`]
          console.log('fromVar', fromVar)
          if (event[eventType] && typeof event[eventType] === 'object') {
            eventValues = Object.keys(event[eventType]).map((property, n) => {
              const value = event[eventType][property]
              // path to value in JSON and AST
              const editPath = `functions.${functionName}.events[${i}].${eventType}.${property}`

              const isFromVariable = event[eventType][`${property}_variable`]
              if (typeof value !== 'object') {
                const displayVal = (typeof value === 'boolean') ? JSON.stringify(value) : value
                let renderValue = (
                  <ServiceValue
                    service={service}
                    valueKey={editPath}
                    value={displayVal}
                  />
                )
                if (isFromVariable) {
                  renderValue = (
                    <span>
                      {isFromVariable}
                    </span>
                  )
                }
                return (
                  <li key={`event-prop-${n}`}>
                    <span className={styles.property}>
                      {property}:
                    </span>
                    {renderValue}
                  </li>
                )
              }
              return null
            })
          }
          return (
            <div key={`event-value-${j}`} className={styles.eventDisplay}>
              <div>
                Event - {eventType}
              </div>
              <div className={styles.eventProperties}>
                {eventValues}
              </div>
            </div>
          )
        })

        return (
          <div key={`event-${i}`}>
            {eventDisplay}
          </div>
        )
      })
    }
    return (
      <Card key={functionName} className={styles.functionCard}>
        <div className={styles.functionInfo}>
          <div className={styles.functionName}>
            <span to={`/service/${service.id}/function/${functionName}`}>
              <ServiceValue
                service={service}
                valueKey={`functions.${functionName}`}
                value={functionName}
              />
            </span>
          </div>

          <div>{functionEvents}</div>
        </div>
        <div className={styles.functionActions}>
          <Button
            type='button'
            onClick={() => { props.runFunctionDeploy(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Deploy Function
          </Button>
          <Button
            type='button'
            onClick={() => { props.showInvokeModal(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Invoke
          </Button>
          <Button
            type='button'
            onClick={() => { props.runLogs(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Logs
          </Button>
          <Button onClick={() => shell.openItem(functionFilePath)}>
            Open in Editor
          </Button>
        </div>
      </Card>
    )
  })

  return (
    <div className={styles.functionList}>
      {functionRender}
    </div>
  )
}

FunctionList.propTypes = {
  service: PropTypes.object
}

export default FunctionList

const getLanguage = (service) => {
  if (!service.config || !service.config.provider) {
    return 'error'
  }
  const provider = service.config.provider
  if (!provider.runtime) {
    return 'NA'
  }
  if (provider.runtime.match(/node/)) {
    return 'js'
  }
  if (provider.runtime.match(/python/)) {
    return 'py'
  }
  if (provider.runtime.match(/java/)) {
    return 'jar'
  }
  return provider.runtime
}
