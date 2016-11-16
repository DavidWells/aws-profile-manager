import React, { Component } from 'react'
import { connect } from 'react-redux'
import updateService from '../actions/updateService'
import ServiceValue from '../components/ServiceValue'

const mapStateToProps = (state, props) => {
  return {
    service: state.services[props.service.id],
  }
}

class ServiceValueContainer extends Component {
  render() {
    return (
      <ServiceValue {...this.props} />
    )
  }
}

export default connect(mapStateToProps, {
  updateService
})(ServiceValueContainer)
