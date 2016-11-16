import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { Link } from 'react-router'
import Modal from 'serverless-site/src/components/Modal'
import Layout from '../Layout'
import Card from '../Card'
import Button from '../Button'
import ServiceCard from './ServiceCard'
import AddService from '../AddService'
import styles from './ServiceList.css'
import {
  PATH_NOT_FOUND,
  PARSING_YAML_FAILED,
} from '../../constants/errors'
const shell = require('electron').shell
// import { sync as checkFileExists } from 'path-exists' // todo check folder paths exist

export default class ServicesList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      filterText: '',
      showModal: false,
    }
  }
  handleServiceRemoval = () => {
    this.props.removeService(this.state.currentService)
    setTimeout(() => {
      this.hideModal()
    }, 100)
  }
  hideModal = () => {
    this.setState({ showModal: false, currentService: null })
  }
  handleFilterInput = (e) => {
    this.setState({
      filterText: e.target.value
    })
  }
  getServices = (text) => {
    const { services } = this.props
    let serviceList = Object.keys(this.props.services)
      .filter((service) => {
        return services[service].config.service.toLowerCase().indexOf(text) > -1 || services[service].config.service.indexOf(text) > -1
      }).map((service) => {
        return (
          <ServiceCard
            service={services[service]}
            showDeleteModal={this.showDeleteModal}
          />
        )
      })
    if (!serviceList.length) {
      serviceList = (
        <div className={styles.notFound}>
          <h2>
            Service "{text}" not found 🙈
          </h2>
          <div>
            Clear your search and try again
          </div>
        </div>
      )
    }
    return serviceList
  }
  showDeleteModal = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      currentService: id
    })
  }
  render() {
    const props = this.props
    const renderServices = this.getServices(this.state.filterText)
    const content = (
      <div className={styles.serviceListPageWrapper}>
        <Modal
          active={this.state.showModal}
          onEscKeyDown={this.hideModal}
          onOverlayClick={this.hideModal}
          title='Are you sure you want to delete this?'
        >
          <div className={styles.modalButtons}>
            <Button type='button' onClick={this.handleServiceRemoval}>
              Confirm Delete
            </Button>
            <Button onClick={this.hideModal}>Cancel</Button>
          </div>
        </Modal>
        <div className={styles.pageTitle}>
          <h1>Serverless Services</h1>
        </div>
        <div className={styles.actionBar}>
          <input onChange={this.handleFilterInput} placeholder='Filter Services' />
          <AddService
            addService={props.addService}
            credentials={props.credentials}
            services={props.services}
            history={props.history}
          />
        </div>
        <div className={styles.serviceList}>
          {renderServices}
        </div>
      </div>
    )

    return <Layout content={content} />
  }
}

ServicesList.propTypes = {
  services: PropTypes.object.isRequired,
}
