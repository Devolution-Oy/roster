import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

class UpdateProject extends Component {

  componentDidMount() {
    // TODO: Load existing projects from firestore
  }
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
        <div id='form_update_project'>
          <label id='label_project'>Project</label>
          <input id='input_project' type='text' name='project' list='projects'></input>
          <datalist id='projects'>
            <option>tasker</option>
            <option>roster</option>
          </datalist>
          <label id='label_budget'>Budget</label>
          <input id='input_budget' type='number' name='budge' />
        </div>
      </Modal>
    );
  }
}

UpdateProject.propTypes = {
  closeProjects: PropTypes.func.isRequired
};

export default UpdateProject;