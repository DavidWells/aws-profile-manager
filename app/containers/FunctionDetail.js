import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const mapStateToProps = (state, props) => {
  const service = state.services[props.params.serviceId]
  return {
    service,
    func: service.config.functions[props.params.functionName],
  }
}

const FunctionDetail = (props) => {
  if (!props.func) {
    return <div>Couldn't find this function</div>
  }
  return (
    <div>
      <div>
        <Link to={`/service/${props.service.id}`}>
          Back to {props.service.id}
        </Link>
      </div>
      <h1>Function: {props.params.functionName}</h1>
      <div>Handler: {props.func.handler}</div>
    </div>
  )
}

export default connect(mapStateToProps, {})(FunctionDetail)
