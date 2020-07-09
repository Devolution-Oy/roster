import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withFirebase} from '../Firebase';
import Modal from '../Modal';

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      loading: null,
      error: null
    };
  }

  componentDidMount() {
    this.setState({loading: 'Loading projects...'});
    this.props.firebase.getProjects().then(projects => {
      this.setState({projects: projects});
      this.setState({loading: null});
      console.log(this.state.projects);
    }).catch(error => {
      this.setState({error: error.message});
      this.setState({loading: null});
    });
  }
  updateProject = () => {
    this.props.closeProjects();
  }

  // TODO: Render loading, error and existing projects
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
  closeProjects: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withFirebase(UpdateProject);