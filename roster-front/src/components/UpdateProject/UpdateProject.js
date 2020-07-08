import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

class UpdateProject extends Component {

  updateProject = () => {
    this.props.closeProjects();
  }
  // TODO: Add project update form
  render() {
    return(
      <Modal
        id='modal_projects'
        title='Create / Update Project'
        onCancel={this.props.closeProjects}
        onAccept={this.updateProject}
        accept='Confirm'>
        <p>Update projects here</p>
      </Modal>
    );
  }
}

UpdateProject.propTypes = {
  closeProjects: PropTypes.func.isRequired
};

export default UpdateProject;