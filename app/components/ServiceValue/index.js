import React, { PropTypes } from 'react'
import updateYamlFileValue from '../../utils/yaml/updateYamlContents'
import ContentEditable from '../ContentEditable'

const propTypes = {
  children: PropTypes.any,
  service: PropTypes.object,
  updateService: PropTypes.func,
}
export default class ServiceValue extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.value = props.value
    this.key = props.valueKey.replace(/^service.config./, '')
    console.log('updateService', props.updateService)
  }
  handleDataChange = (e, value) => {
    console.log(e)
    console.log(e.target)
    // console.log('updated this', e.target.dataset.key +'=' + e.target.value)
    // console.log('change range', window.CURRENT_AST[e.target.dataset.key])
    // const currentASTNODE = window.CURRENT_AST[e.target.dataset.key]
    // const currentYMLPATH = window.CURRENT_AST.PATH
    this.value = e.target.value
    // this.key = e.target.dataset.key
    // updateYamlFileValue(e.target.value, currentASTNODE, currentYMLPATH)
  }
  handleBlur = (e, value) => {
    const { service } = this.props
    console.log('handle blur')
    // console.log(this.value)
    // console.log(this.key)
    const currentASTNODE = window.CURRENT_AST[this.key]
    const currentYMLPATH = window.CURRENT_AST.PATH
    if (this.props.updateService) {
      this.props.updateService(service, this.key, this.value)
    }
    updateYamlFileValue(this.value, currentASTNODE, currentYMLPATH)
  }
  render() {
    const { value, valueKey, service } = this.props
    let isFromVariable = false
    const objectKeys = valueKey.split('.')
    console.log('service', service)
    objectKeys.splice(0, 1)
    console.log('objectKeys', objectKeys)
    if (objectKeys && objectKeys.length === 2) {
      console.log('objectKeys', objectKeys)
      isFromVariable = service[objectKeys[0]][`${objectKeys[1]}_var`]
    } else if (objectKeys && objectKeys.length === 3) {
      isFromVariable = service[objectKeys[0]][objectKeys[1]][`${objectKeys[2]}_var`]
    }
    if (isFromVariable) {
      return (
        <span>{value} (i) {isFromVariable}</span>
      )
    }
    /*
      Disable editable until yaml editing finished
      <span ref='test'>
      <ContentEditable
        tagName='span'
        editKey={valueKey}
        onChange={this.handleDataChange} // handle innerHTML change
        onBlur={this.handleBlur} // handle innerHTML change
      >
        {value}
      </ContentEditable>
      </span>
     */
    return (
      <span ref='test'>
        <ContentEditable
          tagName='span'
          editKey={valueKey}
          onChange={this.handleDataChange} // handle innerHTML change
          onBlur={this.handleBlur} // handle innerHTML change
        >
          {value}
        </ContentEditable>
      </span>
    )
  }
}

ServiceValue.propTypes = propTypes
