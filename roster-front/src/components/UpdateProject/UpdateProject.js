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
    if (window.confirm('Updating project"' + data.name + '"\n"' +
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

  // TODO: Handle all config parameters
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

    // TODO: Add scroll area for settings
    // TODO: Load price configs from project data
    // TODO: Add checkbox for github project
    // TODO: Add option to add contributors
    // TODO: Add task price configs to own component
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
          <div id='task_prices'>
            <h5>Task closing prices</h5>
            <label className='configs_label' id='config_label_dev'>dev</label>
            <input className='configs_input' id='config_input_dev' type='number' />
            <label className='configs_label' id='config_label_ux'>UX</label>
            <input className='configs_input' id='config_input_ux' type='number' />
            <label className='configs_label' id='config_label_testautomation'>test automation</label>
            <input className='configs_input' id='config_input_testautomation' type='number' />
            <label className='configs_label' id='config_label_bug'>bug</label>
            <input className='configs_input' id='config_input_bug' type='number' />
            <label className='configs_label' id='config_label_documentation'>documentation</label>
            <input className='configs_input' id='config_input_documentation' type='number' />
            <label className='configs_label' id='config_label_question'>question</label>
            <input className='configs_input' id='config_input_question' type='number' />
            <label className='configs_label' id='config_label_design'>design</label>
            <input className='configs_input' id='config_input_design' type='number' />
            <label className='configs_label' id='config_label_design'>design</label>
            <input className='configs_input' id='config_input_design' type='number' />
          </div>
          <div id='review_prices'>
            <h5>Review</h5>
            <label className='configs_label' id='config_label_review'>Review</label>
            <input className='configs_input' id='config_input_review' type='number' />
          </div>
          <div id='issue_creation'>
            <h5>Issue open</h5>
            <label className='configs_label' id='config_label_open'>Open</label>
            <input className='configs_input' id='config_input_open' type='number' />
            <label className='configs_label' id='config_label_accepted'>Accepted</label>
            <input className='configs_input' id='config_input_accepted' type='number' />
          </div>
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