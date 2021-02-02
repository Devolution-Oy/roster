import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProjectView.css';
import ClosedTasks from '../ClosedTasks';
import ReadyTasks from '../ImplementionReadyTasks/ReadyTasks';

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
    GithubRequests.getImplementationReadyIssues(this.props.project).then(res => {
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

  render() {
    const project = this.state.project;
    const viewId = 'project_view_' + project.name;
    const tasks = this.state.tasks;
    if (this.state.error) {
      return (<p>{this.state.error}</p>);
    }

    return (
      <div id={viewId} className='project_view'>
        <div className='project_header_row'>
          <h3 className='project_header'>{project.name}</h3>
          <h3 className='project_budget'>{(Math.round(project.budget * 100)/ 100).toFixed(2)} €</h3>
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