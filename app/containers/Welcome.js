import { connect } from 'react-redux'
import addService from '../actions/addService'
import removeService from '../actions/removeService'
import Welcome from '../components/Welcome'

const mapStateToProps = (state) => {
  return {
    services: state.services,
    credentials: state.credentials,
  }
}

export default connect(mapStateToProps, {
  addService,
  removeService
})(Welcome)
