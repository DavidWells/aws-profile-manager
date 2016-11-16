import React, { Component } from 'react'
import { connect } from 'react-redux'
import setProfileForService from '../actions/setProfileForService'
import setRegionForService from '../actions/setRegionForService'
import setStageForService from '../actions/setStageForService'
import runServiceDeploy from '../actions/runServiceDeploy'
import runServiceRemove from '../actions/runServiceRemove'
import runFunctionDeploy from '../actions/runFunctionDeploy'
import clearConsoleForService from '../actions/clearConsoleForService'
import runInvoke from '../actions/runInvoke'
import runLogs from '../actions/runLogs'
import refreshServiceFromFileSystem from '../actions/refreshServiceFromFileSystem'
import ServiceView from '../components/ServiceView'

const mapStateToProps = (state, props) => {
  return {
    service: state.services[props.params.serviceId],
    credentials: state.credentials,
  }
}

class ServiceDetail extends Component {
  constructor(props) {
    super(props)
    if (this.props.service) {
      props.refreshServiceFromFileSystem(this.props.service.id)
    }
  }

  render() {
    if (!this.props.service) {
      return <div>Couldn't find this service</div>
    }

    return (
      <ServiceView {...this.props} />
    )
  }
}

export default connect(mapStateToProps, {
  setProfileForService,
  setRegionForService,
  setStageForService,
  runServiceDeploy,
  runServiceRemove,
  runFunctionDeploy,
  runLogs,
  runInvoke,
  refreshServiceFromFileSystem,
  clearConsoleForService,
})(ServiceDetail)
