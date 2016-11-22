import React, { PropTypes } from 'react'
import { shell } from 'electron'
import { Link } from 'react-router'
import { PATH_NOT_FOUND, PARSING_YAML_FAILED } from '../../constants/errors'
import Card from '../Card'
import Button from '../Button'
import styles from './ServiceCard.css'

const propTypes = {
  service: PropTypes.object,
  showDeleteModal: PropTypes.func,
}

const ServiceCard = ({ service, showDeleteModal }) => {
  return (
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
        <Button
          disabled={!!service.error}
          onClick={() => shell.openItem(service.projectPath)}
        >
          Open directory
        </Button>
        <Button
          type='button'
          onClick={() => showDeleteModal(service.id)}
        >
          Remove from list
        </Button>
      </div>
    </Card>
  )
}

ServiceCard.propTypes = propTypes

export default ServiceCard
