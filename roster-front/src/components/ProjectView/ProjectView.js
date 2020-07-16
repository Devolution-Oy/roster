import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProjectView.css';
import ClosedTasks from '../ClosedTasks';
import ReadyTasks from '../ImplementionReadyTasks/ReadyTasks';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project
    };
  }

  render() {
    // TODO: Ready for implementation tasks for the project
    const project = this.state.project;
    const viewId = 'project_view_' + project.name;
    return (
      <div id={viewId} className='project_view'>
        <div className='project_header_row'>
          <h3 className='project_header'>{project.name}</h3>
          <h3 className='project_budget'>{project.budget} €</h3>
        </div>
        <ClosedTasks project={project.name} />
        {project.github ? <ReadyTasks project={project.name} /> : null }
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