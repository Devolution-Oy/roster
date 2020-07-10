
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      loading: null,
      error: null,
      name: props.name
    };
  }

  render() {
    const name = this.state.name;
    const id = this.state.name + '_tasks';
    // TODO: Get project's tasks from github
    return (
      <div id={id}>
        <h3>{name}</h3>
        <label>Task1</label>
        <label>Task2</label>
        <label>Task3</label>
      </div>
    );
  }
}

ProjectTasks.propTypes = {
  name: PropTypes.string.isRequired
};

export default ProjectTasks;