import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ProjectView.css';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project
    };
  }

  render() {
    // TODO: Fetch recent tasks for the project
    // TODO: Ready for implementation tasks for the project
    // TODO: Create subcomponent for closed tasks
    // TODO: Create subcomponent for implementation tasks
    const project = this.state.project;
    const viewId = 'project_view_' + project.name;
    return (
      <div id={viewId} className='project_view'>
        <div className='project_header_row'>
          <h3 className='project_header'>{project.name}</h3>
          <h3 className='project_budget'>{project.budget} €</h3>
        </div>
        <div className='project_latest'>
          <h4>Just closed</h4>
          <label>Latest closed task1</label>
          <label>Latest closed task2</label>
          <label>Latest closed task3</label>
        </div>
        <div className='project_ready'>
          <h4>Ready for implementation</h4>
          <label>Do something</label> 
          <label>Improve something</label> 
        </div>
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