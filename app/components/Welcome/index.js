import React from 'react'
import AddService from '../AddService'
import AddCredentials from '../AddCredentials'
import styles from './Welcome.css'

const Welcome = (props) => {
  if (!props.credentials) {
    return <AddCredentials />
  }
  return (
    <div>
      <div className={styles.welcomeWrapper}>
        <h1 className={styles.heading}>Serverless Dashboard</h1>
        <p>
          What would you like to do?
        </p>
        <AddService
          addService={props.addService}
          services={props.services}
          credentials={props.credentials}
          history={props.history}
        />
      </div>
    </div>
  )
}

export default Welcome
