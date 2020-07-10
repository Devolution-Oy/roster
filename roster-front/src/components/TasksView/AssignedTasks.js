import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AssignedTasks.css';

import ProjectTasks from './ProjectTasks';

class AssignedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    };
  }

  componentDidMount() {
    this.setState({projects: this.props.projects});
  }

  render() {
    // TODO: Loop projects and render my tasks in each project
    const projects = this.state.projects;
    return (
      <div className='assigned_tasks' id='div_assigned_tasks'>
        <h2 id='header_my_tasks'>My tasks</h2>
        {
          projects ? projects.map((project, i) => {
            return (<ProjectTasks key={i} name={project} />);
          }) : null
        }
      </div>
    );
  }
}

AssignedTasks.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AssignedTasks;