import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import addProfile from '../actions/addProfile'
import removeProfile from '../actions/removeProfile'
import updateProfile from '../actions/updateProfile'
import addCredentials from '../actions/addCredentials'
import AddCredentials from '../components/AddCredentials'
import ManageCredentials from '../components/ManageCredentials'

const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
  }
}

const Creds = (props) => {
  // console.log(props)
  if (isEmpty(props.credentials)) {
    return <AddCredentials addCredentials={props.addCredentials} />
  }
  return (
    <ManageCredentials credentials={props.credentials} {...props} />
  )
}

export default connect(mapStateToProps, {
  addCredentials,
  addProfile,
  removeProfile,
  updateProfile,
})(Creds)
