import { connect } from 'react-redux'
import addProfile from '../actions/addProfile'
import ManageCredentials from '../components/ManageCredentials'

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
  }
}

export default connect(mapStateToProps, {
  addProfile,
})(ManageCredentials)
