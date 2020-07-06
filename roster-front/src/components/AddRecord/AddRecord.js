import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { AddRecord } from './AddRecordModal';
import { withFirebase } from '../Firebase';


class AddRecordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      projects: null,
      error: null
    };  
  }
  addRecord = () => {
    // TODO: Call postRecord function to add custom record
    console.log('Adding a record');
    this.props.closeAddRecord();
  };

  getUsers = () => {
    console.log('fetching users with firebase');
    return this.props.firebase.getUsers();
  }

  getProjects = () => {
    console.log('fetching projects');
    return this.props.firebase.getProjects();
  }

  componentDidMount() {
    this.setState({loading: true});
    Promise.all([this.getUsers(), this.getProjects()]).then((values) => {
      this.setState({ users: values[0].data, projects: values[1] });

    }).catch(error => {
      this.setState({error: error});
    });
  }

  render() {
    const users = this.state.users;
    const projects = this.state.projects;
    const error = this.state.error;
    return (
      <Modal
        id='modal_add_record'
        title='Add Custom Record'
        onCancel={this.props.closeAddRecord}
        onAccept={this.addRecord}
        accept='Confirm'>
        <AddRecord users={users} projects={projects} error={error} />
      </Modal>
    );
  }
}

AddRecordPopup.propTypes = {
  closeAddRecord: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withFirebase(AddRecordPopup);