import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withFirebase} from '../Firebase';
import Modal from '../Modal';
import ProjectConfigs from '../ProjectConfigs';

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      loading: null,
      error: null,
      updating: null,
      project: null,
      github: false,
      name: null,
      contributors: [],
      budget: 0,
      dev: 0,
      ux: 0,
      testautomation: 0,
      bug: 0,
      documentation: 0,
      question: 0,
      design: 0,
      review: 0,
      accepted: 0,
    };
  }

  componentDidMount() {
    this.setState({loading: 'Loading projects...'});
    this.props.firebase.getProjects().then(projects => {
      this.setState({
        projects: projects.data,
        loading: null
      });
    }).catch(error => {
      this.setState({
        error: error.message,
        loading: null
      });
    });
  }

  updateProject = () => {
    this.setState({updating: 'Updating projects...'});
    const data = {
      name: this.state.name,
      budget: Number(this.state.budget),
      dev: Number(this.state.dev),
      ux: Number(this.state.ux),
      testautomation: Number(this.state.testautomation),
      bug: Number(this.state.bug),
      documentation: Number(this.state.documentation),
      question: Number(this.state.question),
      design: Number(this.state.design),
      review: Number(this.state.review),
      accepted: Number(this.state.accepted),
      contributors: this.state.contributors,
      github: this.state.github
    };
    if (window.confirm('Updating project"' + data.name + '"\n"' +
      'Budget: ' + data.budget)) {
      console.log(data);
      this.props.firebase.updateProject(data).then(() => {
        this.setState({ updating: null });
        this.props.closeProjects();
      }).catch(err => {
        this.setState({
          updating: null,
          error: err.message
        });
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

  // TODO: Handle all config parameters
  onChange = event => {
    if (event.target.name === 'project') {
      var project = this.state.projects.find(project => project.name === event.target.value);

      if (project) {
        this.setState({
          project: project,
          name: event.target.value,
          budget: project.budget,
          github: project.github,
          contributors: project.contributors,
        });
      } else {
        this.setState({ name: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value } );
    }
  }

  render() {
    const projects = this.state.projects;
    const loading = this.state.loading;
    const error = this.state.error;
    const updating = this.state.updating;
    const project = this.state.project;
    const budget = this.state.budget;

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

    // TODO: Add scroll area for settings
    // TODO: Load price configs from project data
    // TODO: Add checkbox for github project
    // TODO: Add option to add contributors
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
              projects ? projects.map((item, i) => {
                let project_id = 'existing_project_' + item.name;
                return (
                  <option id={project_id} key={i} value={item.name}>{item.name}</option>
                );
              }) : null
            }
          </datalist>
          <label id='label_budget'>Budget</label>
          <input id='input_budget' type='number' name='budget' onChange={this.onChange} value={Number(budget).toFixed(2)} />
          <ProjectConfigs project={project} change={this.onChange} />
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