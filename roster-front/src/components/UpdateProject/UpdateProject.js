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
      error: null,
      updating: null,
      project: null,
      budget: 0
    };
  }

  componentDidMount() {
    this.setState({loading: 'Loading projects...'});
    this.props.firebase.getProjects().then(projects => {
      this.setState({projects: projects.data});
      this.setState({loading: null});
    }).catch(error => {
      this.setState({error: error.message});
      this.setState({loading: null});
    });
  }

  updateProject = () => {
    this.setState({updating: 'Updating projects...'});
    const data = {
      name: this.state.project,
      budget: Number(this.state.budget)
    };
    if (window.confirm('Updating project"' + data.project + '"\n"' +
      'Budget: ' + data.budget)) {
      this.props.firebase.updateProject(data).then(() => {
        this.setState({ updating: null });
        this.props.closeProjects();
      }).catch(err => {
        this.setState({ updating: null });
        this.setState({ error: err.message });
      });
    }
  }

  getProjectBudget = name => {
    const projects = this.state.projects;
    try {
      const project = projects.find(x => x.name === name);
      return project.budget;

    } catch {
      return 0;
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'project') {
      let budget = this.getProjectBudget(event.target.value);
      this.setState({budget: budget});
    }
  }

  render() {
    const projects = this.state.projects;
    const budget = this.state.budget;
    const loading = this.state.loading;
    const error = this.state.error;
    const updating = this.updating;

    if (updating) {
      return (
        <Modal
          id='modal_projects'
          title='Create / Update Project'
          onCancel={this.props.closeProjects}
          onAccept={this.updateProject}
          accept='Confirm'
          disabled={true}>
          <p>{updating}</p>
        </Modal>
      );
    }

    if (loading) {
      return (
        <Modal
          id='modal_projects'
          title='Create / Update Project'
          onCancel={this.props.closeProjects}
          onAccept={this.updateProject}
          accept='Confirm'
          disabled={true}>
          <p>Loading existing projects...</p>
        </Modal>
      );
    }

    if (error) {
      return (
        <Modal
          id='modal_projects'
          title='Create / Update Project'
          onCancel={this.props.closeProjects}
          onAccept={this.updateProject}
          accept='Confirm'
          disabled={true}>
          <p>{error}</p>
        </Modal>
      );
    }

    return(
      <Modal
        id='modal_projects'
        title='Create / Update Project'
        onCancel={this.props.closeProjects}
        onAccept={this.updateProject}
        accept='Confirm'>
        <div id='form_update_project'>
          <label id='label_project'>Project</label>
          <input id='input_project' type='text' name='project' list='projects' onChange={this.onChange}></input>
          <datalist id='projects'>
            {
              projects ? projects.map((project, i) => {
                let project_id = 'existing_project_' + project.name;
                return (
                  <option id={project_id} key={i} value={project.name}>{project.name}</option>
                );
              }) : null
            }
          </datalist>
          <label id='label_budget'>Budget</label>
          <input id='input_budget' type='number' name='budget' onChange={this.onChange} value={Number(budget).toFixed(2)} />
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