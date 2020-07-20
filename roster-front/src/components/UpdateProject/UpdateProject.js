import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-perfect-scrollbar';

import { withFirebase} from '../Firebase';
import Modal from '../Modal';
import ProjectConfigs from '../ProjectConfigs';

import './UpdateProject.css';

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
    // TODO: Show all project parameters on confirm dialog
    if (window.confirm('Updating / Creating project "' + data.name + '"\n"' +
      'Budget: ' + data.budget + '\n' +
      'github: ' + data.github + '\n\n' +
      'Task Parameters\n' + 
      'Dev: ' + data.dev + '\n' +
      'UX: ' + data.ux + '\n' +
      'Test Automation: ' + data.testautomation + '\n' +
      'Bug: ' + data.bug + '\n' +
      'Documentation: ' + data.documentation + '\n' +
      'Question: ' + data.question + '\n' +
      'Design: ' + data.design + '\n' +
      'Review: ' + data.review + '\n' +
      'Task creation: ' +  data.accepted + '\n'
    )) {
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

  onChange = event => {
    if (event.target.name === 'project') {
      var project = this.state.projects.find(project => project.name === event.target.value);

      if (project) {
        this.setState({
          name: event.target.value,
          budget: project.budget,
          github: project.github,
          contributors: project.contributors,
          dev: project.dev,
          ux: project.ux,
          testautomation: project.testautomation,
          bug: project.bug,
          documentation: project.documentation,
          question: project.question,
          design: project.design,
          review: project.review,
          accepted: project.accepted
        });
      } else {
        this.setState({ name: event.target.value });
      }
    } else {
      if (event.target.name !== 'github') {
        this.setState({ [event.target.name]: event.target.value } );
      } else {
        this.setState({ [event.target.name]: event.target.checked} );
      }
    }
  }

  render() {
    const projects = this.state.projects;
    const loading = this.state.loading;
    const error = this.state.error;
    const updating = this.state.updating;
    const budget = this.state.budget;
    const dev = this.state.dev;
    const ux = this.state.ux;
    const testautomation = this.state.testautomation;
    const bug = this.state.bug;
    const documentation = this.state.documentation;
    const question = this.state.question;
    const design = this.state.design;
    const review = this.state.review;
    const accepted = this.state.accepted;
    const github = this.state.github;

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

    // TODO: Add option to add contributors
    return(
      <Modal
        id='modal_projects'
        title='Create / Update Project'
        onCancel={this.props.closeProjects}
        onAccept={this.updateProject}
        accept='Confirm'>
        <div id='form_update_project'>
          <ScrollBar component='div'>
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
            <label id='label_github'>Github Project</label>
            <input id='input_github' type='checkbox' name='github' onChange={this.onChange} value={github} checked={Boolean(github)} />
            <ProjectConfigs
              dev={dev}
              ux={ux}
              testautomation={testautomation}
              bug={bug}
              documentation={documentation}
              question={question}
              design={design}
              review={review}
              accepted={accepted}
              change={this.onChange} />
          </ScrollBar>
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