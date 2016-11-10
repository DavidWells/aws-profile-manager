import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import addCredentials from '../actions/addCredentials'
import AddCredentials from '../components/AddCredentials'
import ServiceList from './ServicesList'
import Welcome from './Welcome'

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    services: state.services,
  }
}

const Dashboard = (props) => {
  if (isEmpty(props.credentials)) {
    return <AddCredentials addCredentials={props.addCredentials} />
  }
  return (
    <div>
      <AddCredentials addCredentials={props.addCredentials} />
      {/* { isEmpty(props.services)
        ? <Welcome history={props.history} />
        : <ServiceList history={props.history} />
      } */}
    </div>
  )
}

export default connect(mapStateToProps, {
  addCredentials,
})(Dashboard)
