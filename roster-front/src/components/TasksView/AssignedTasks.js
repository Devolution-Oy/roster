import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AssignedTasks.css';
import { withFirebase} from '../Firebase';

import ProjectTasks from './ProjectTasks';

class AssignedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects,
      user: props.user
    };
  }

  render() {
    const projects = this.state.projects;
    const user = this.state.user;

    return (
      <div className='assigned_tasks' id='div_assigned_tasks'>
        <h2 id='header_my_tasks'>My tasks</h2>
        {
          projects ? projects.map((project, i) => {
            if (project.github) {
              return (<ProjectTasks key={i} name={project.name} user={user} />);
            }
            else
              return null;
          }) : null
        }
      </div>
    );
  }
}

AssignedTasks.propTypes = {
  user: PropTypes.PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    github: PropTypes.bool,
    contributors: PropTypes.arrayOf(PropTypes.string).isRequired
  }))
};

export default withFirebase(AssignedTasks);