import React, { PropTypes } from 'react'
import Modal from 'serverless-site/src/components/Modal'
import Form from 'serverless-site/src/components/Form'
import Button from '../Button'
import Card from '../Card'
import {
  getAWSCredentials,
  updateAWSProfile,
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
    const updatedProfiles = deleteAWSProfile(this.state.profile)
    setTimeout(() => {
      this.setState({
        showModal: false,
        credentials: updatedProfiles
      })
    }, 100)
  }

  handleProfileEdit = (event, data) => {
    event.preventDefault()
    const updatedProfiles = updateAWSProfile(this.state.profile, {
      aws_access_key_id: data.aws_access_key_id,
      aws_secret_access_key: data.aws_secret_access_key
    })
    setTimeout(() => {
      this.setState({
        showModal: false,
        credentials: updatedProfiles
      })
    }, 100)
  }

  handleProfileAdd = (event, data) => {
    event.preventDefault()
    this.props.addProfile(data)
    setTimeout(() => {
      this.setState({
        showModal: false,
      })
    }, 100)
  }

  hideModal = () => {
    this.setState({ showModal: false, currentService: null })
  }

  setFieldValues = (profileName) => {
    if (!profileName || !this.state.credentials[profileName]) {
      return
    }
    Object.keys(this.state.credentials[profileName]).forEach((item) => {
      const node = document.getElementById(item)
      if (node) {
        node.value = this.state.credentials[profileName][item]
      }
    })
  }
  showModal = (e) => {
    const action = (e.target.dataset) ? e.target.dataset.action : null
    const profileName = (e.target.dataset.profile) ? e.target.dataset.profile : null
    this.setState({
      showModal: true,
      modalAction: action,
      profile: profileName
    }, () => {
      // No need to mess around with form field change/change handlers
      this.setFieldValues(profileName)
    })
  }
  renderModalContents() {
    const { modalAction, profile } = this.state
    if (modalAction === 'add') {
      return (
        <div>
          <Form onSubmit={this.handleProfileAdd}>
            <div className={styles.modalInputs}>
              <h3>Add AWS Profile</h3>
              <div>
                <label htmlFor='profile'>Profile name</label>
                <input
                  id='profile'
                  name='profile'
                  type='text'
                  placeholder='Enter Profile Name'
                />
              </div>
              <div>
                <label htmlFor='aws_access_key_id'>AWS Access Key</label>
                <input
                  id='aws_access_key_id'
                  name='aws_access_key_id'
                  type='text'
                  placeholder='Enter Your AWS Access Key ID'
                />
              </div>
              <div>
                <label htmlFor='aws_secret_access_key'>AWS Secret Access Key</label>
                <input
                  id='aws_secret_access_key'
                  name='aws_secret_access_key'
                  type='text'
                  placeholder='Enter Your AWS Access Key ID'
                />
              </div>
            </div>
            <div className={styles.modalButtons}>
              <Button>
                Add Profile
              </Button>
              <Button
                type='button'
                className={styles.fakeButton}
                onClick={this.hideModal}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )
    } else if (modalAction === 'delete') {
      return (
        <div className={styles.deleteModal}>
          <h3>Are you sure your want to delete the "{profile}" profile?</h3>
          <p>There is no undo!</p>
          <div className={styles.modalButtons}>
            <Button type='button' onClick={this.handleProfileRemoval}>
              Confirm DELETE
            </Button>
            <Button
              type='button'
              className={styles.fakeButton}
              onClick={this.hideModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      )
    } else if (modalAction === 'edit') {
      return (
        <div>
          <Form onSubmit={this.handleProfileEdit}>
            <div className={styles.modalInputs}>
              <h3>Edit {profile} Keys</h3>
              <div>
                <label htmlFor='aws_access_key_id'>AWS Access Key</label>
                <input
                  id='aws_access_key_id'
                  name='aws_access_key_id'
                  type='text'
                  placeholder='Enter Your AWS Access Key ID'
                />
              </div>
              <div>
                <label htmlFor='aws_secret_access_key'>AWS Secret Access Key</label>
                <input
                  id='aws_secret_access_key'
                  name='aws_secret_access_key'
                  type='text'
                  placeholder='Enter Your AWS Access Key ID'
                />
              </div>
            </div>
            <div className={styles.modalButtons}>
              <Button>
                Save Changes
              </Button>
              <Button type='button' onClick={this.hideModal}>
                Cancel
              </Button>
            </div>
          </Form>
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
