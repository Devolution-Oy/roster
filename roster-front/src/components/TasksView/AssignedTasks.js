import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AssignedTasks.css';

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
    return (
      <div className='assigned_tasks' id='div_assigned_tasks'>
        <h2 id='header_my_tasks'>My tasks</h2>
      </div>
    );
  }
}

AssignedTasks.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired
  }))
};

export default AssignedTasks;