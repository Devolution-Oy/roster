import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

export const AddRecord = () => (
  // TODO: Load user list from firebase
  // TODO: Load project list from firebase
  <div id='form_add_record'>
    <label>User</label>
    <label>Project</label>
    <label>Description</label>
    <label>Issue</label>
  </div>
);

class AddRecordPopup extends Component {
  addRecord = () => {
    // TODO: Call postRecord function to add custom record
    console.log('Adding a record');
    this.props.closeAddRecord();
  };

  render() {
    return (
      <Modal
        id='modal_add_record'
        title='Add Custom Record'
        onCancel={this.props.closeAddRecord}
        onAccept={this.addRecord}
        accept='Confirm'>
        <AddRecord />
      </Modal>
    );
  }
}

AddRecordPopup.propTypes = {
  closeAddRecord: PropTypes.func.isRequired
};

export default AddRecordPopup;