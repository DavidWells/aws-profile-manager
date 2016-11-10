import React, { PropTypes } from 'react'
import Modal from 'serverless-site/src/components/Modal'
import Button from '../Button'
import Card from '../Card'
import {
  getAWSCredentials,
  // updateAWSProfile,
  deleteAWSProfile
} from '../../utils/aws'
import styles from './ManageCredentials.css'

const propTypes = {
  children: PropTypes.any
}
export default class ManageCredentials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      ModalAction: null,
      credentials: getAWSCredentials()
    }
  }
  handleProfileRemoval = () => {
    const profiles = deleteAWSProfile(this.state.profile)
    setTimeout(() => {
      this.setState({ showModal: false, credentials: profiles })
    }, 100)
  }
  handleProfileEdit = () => {
    setTimeout(() => {
      this.hideModal()
    }, 100)
  }
  handleServiceAdd = () => {
    setTimeout(() => {
      this.hideModal()
    }, 100)
  }
  hideModal = () => {
    this.setState({ showModal: false, currentService: null })
  }
  showModal = (e) => {
    const action = (e.target.dataset) ? e.target.dataset.action : null
    const profile = (e.target.dataset.profile) ? e.target.dataset.profile : null
    this.setState({
      showModal: true,
      modalAction: action,
      profile
    })
  }
  renderModalContents() {
    const { modalAction, profile } = this.state
    const profileValues = this.state.credentials[profile]
    if (modalAction === 'add') {
      return (
        <div>
          <div className={styles.modalInputs}>
            <h3>Add AWS Profile</h3>
            <div>
              <label htmlFor='Access'>AWS Access Key</label>
              <input
                id='Access'
                type='text'
                placeholder='Enter Your AWS Access Key ID'
              />
            </div>
            <div>
              <label htmlFor='Secret'>AWS Secret Access Key</label>
              <input
                id='Secret'
                type='text'
                placeholder='Enter Your AWS Access Key ID'
              />
            </div>
          </div>
          <div className={styles.modalButtons}>
            <Button type='button' onClick={this.handleProfileEdit}>
              Add Profile
            </Button>
            <Button onClick={this.hideModal}>
              Cancel
            </Button>
          </div>
        </div>
      )
    } else if (modalAction === 'delete') {
      return (
        <div>
          <h3>Are you sure your want to delete the "{profile}" profile?</h3>
          <div className={styles.modalButtons}>
            <Button type='button' onClick={this.handleProfileRemoval}>
              Confirm DELETE
            </Button>
            <Button onClick={this.hideModal}>Cancel</Button>
          </div>
        </div>
      )
    } else if (modalAction === 'edit') {
      return (
        <div>
          <div className={styles.modalInputs}>
            <h3>Edit {profile} Keys</h3>
            <div>
              <label htmlFor='Access'>AWS Access Key</label>
              <input
                id='Access'
                type='text'
                placeholder='Enter Your AWS Access Key ID'
                value={profileValues.aws_access_key_id}
              />
            </div>
            <div>
              <label htmlFor='Secret'>AWS Secret Access Key</label>
              <input
                id='Secret'
                type='text'
                placeholder='Enter Your AWS Access Key ID'
                value={profileValues.aws_secret_access_key}
              />
            </div>
          </div>
          <div className={styles.modalButtons}>
            <Button type='button' onClick={this.handleProfileEdit}>
              Save Changes
            </Button>
            <Button onClick={this.hideModal}>
              Cancel
            </Button>
          </div>
        </div>
      )
    }
  }
  render() {
    const { credentials } = this.state
    let credentialList
    if (credentials) {
      credentialList = Object.keys(credentials).map((profile, i) => {
        return (
          <Card key={i} className={styles.card}>
            <div>{profile}</div>
            <div className={styles.actions}>
              <Button
                onClick={this.showModal}
                data-profile={profile}
                data-action='edit'
              >
                Edit
              </Button>
              <Button
                onClick={this.showModal}
                data-profile={profile}
                data-action='delete'
              >
                Delete
              </Button>
            </div>
          </Card>
        )
      })
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Manage AWS Profiles</h2>
          <Button data-action='add' onClick={this.showModal}>
            Add New Profile
          </Button>
        </div>
        <div>
          <h3>AWS credentials</h3>
          <div className={styles.list}>
            {credentialList}
          </div>
        </div>
        <Modal
          className={styles.modal}
          active={this.state.showModal}
          onEscKeyDown={this.hideModal}
          onOverlayClick={this.hideModal}
        >
          {this.renderModalContents()}
        </Modal>
      </div>
    )
  }
}

ManageCredentials.propTypes = propTypes
