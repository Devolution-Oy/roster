import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProjectView.css';
import ClosedTasks from '../ClosedTasks';
import ReadyTasks from '../ImplementionReadyTasks/ReadyTasks';
import GithubRequests from '../GithubRequests';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project,
      tasks: null,
      error: null
    };
  }
  componentDidMount() {
    if (this.props.project.github) {
      GithubRequests.getImplementationReadyIssues(this.props.project.name).then(res => {
        this.setState({
          tasks: res.data,
        });
      }).catch(err => {
        console.log(err.message);
        this.setState({
          error: err.message
        });
      });
    }
  }

  // TODO Loop ready tasks and calculate their value
  calculateTaskValue = () => {
    return 0.00;
  }
  render() {
    const project = this.state.project;
    const viewId = 'project_view_' + project.name;
    const tasks = this.state.tasks;
    const taskValue = this.calculateTaskValue();
    if (this.state.error) {
      return (<p>{this.state.error}</p>);
    }

    return (
      <div id={viewId} className='project_view'>
        <div className='project_header_row'>
          <h3 className='project_header'>{project.name}</h3>
          <h3 className='project_budget'>{(Math.round(project.budget * 100)/ 100).toFixed(2)} €</h3>
        </div>
        <div className='project_header_row'>
          <h4 className='project_header'>Ready task value</h4>
          <h4 className='project_budget'>{taskValue} €</h4>
        </div>
        <ClosedTasks project={project.name} />
        {project.github ? <ReadyTasks project={project.name} tasks={tasks}/> : null }
      </div>
    );
  }  
}

ProjectView.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    github: PropTypes.bool,
    contributors: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default ProjectView;