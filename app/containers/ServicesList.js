import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
import addService from '../actions/addService'
import removeService from '../actions/removeService'
import refreshServiceFromFileSystem from '../actions/refreshServiceFromFileSystem'
import ServiceList from '../components/ServiceList'
import Welcome from './Welcome'

const mapStateToProps = (state) => {
  return {
    services: state.services,
    credentials: state.credentials,
  }
}

class ServicesList extends Component {
  constructor(props) {
    super(props)
    forEach(props.services, (value, key) => {
      props.refreshServiceFromFileSystem(key)
    })
  }

  render() {
    if (isEmpty(this.props.services)) {
      return <Welcome />
    }
    return (
      <ServiceList {...this.props} />
    )
  }
}

export default connect(mapStateToProps, {
  addService,
  removeService,
  refreshServiceFromFileSystem
})(ServicesList)
