import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { Link } from 'react-router'
import Modal from 'serverless-site/src/components/Modal'
import Layout from '../Layout'
import Card from '../Card'
import Button from '../Button'
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
  showDeleteModal = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      currentService: id
    })
  }
  render() {
    const props = this.props
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
        <h1>Serverless Services</h1>
        <AddService
          addService={props.addService}
          credentials={props.credentials}
          services={props.services}
          history={props.history}
        />
        <div className={styles.serviceList}>
          {map(props.services, (service) => (
            <Card className={styles.service} key={service.id}>
              <div className={styles.info}>
                { service.error && service.error.type === PATH_NOT_FOUND &&
                  <div>
                    Couldn't find the service path anymore. In case you moved it please remove
                    and re-add this service again.
                  </div>
                }
                { service.error && service.error.type === PARSING_YAML_FAILED &&
                  <div>
                    Couldn't parse the serverless.yaml file.
                  </div>
                }
                <Link
                  className={styles.serviceLink}
                  to={`/service/${service.id}`}
                >
                  <span>{service.config.service}</span>
                  <i className='fa fa-external-link' aria-hidden='true' />
                </Link>
                <div className={styles.serviceMetaWrapper}>
                  <div className={styles.serviceMeta}>
                    <span className={styles.serviceMetaProperty}>
                      Path:
                    </span>
                    <span className={styles.serviceMetaValue}>
                      {service.projectPath}
                    </span>
                  </div>
                  <div className={styles.serviceMeta}>
                    <span className={styles.serviceMetaProperty}>
                      Provider:
                    </span>
                    <span className={styles.serviceMetaValue}>
                      {service.config.provider.name}
                    </span>
                  </div>
                  <div className={styles.serviceMeta}>
                    <span className={styles.serviceMetaProperty}>
                      Runtime:
                    </span>
                    <span className={styles.serviceMetaValue}>
                      {service.config.provider.runtime}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                { service.error
                  ? <Button disabled>View Service</Button>
                  : <Link to={`/service/${service.id}`}><Button>View Service</Button></Link>
                }
                <Button disabled={!!service.error} onClick={() => shell.openItem(service.projectPath)}>Open directory</Button>
                <Button type='button' onClick={() => this.showDeleteModal(service.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )

    return <Layout content={content} />
  }
}

ServicesList.propTypes = {
  services: PropTypes.object.isRequired,
}
