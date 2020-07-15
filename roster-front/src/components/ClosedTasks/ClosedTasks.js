import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClosedTasks extends Component {

  componentDidMount() {
    console.log(this.props.project);
  }

  render() {
    return (
      <div className='project_latest'>
        <h4>Just closed</h4>
        <label>Latest closed task1</label>
        <label>Latest closed task2</label>
        <label>Latest closed task3</label>
      </div>
    );
  }
}

ClosedTasks.propTypes = {
  project: PropTypes.string.isRequired
};

export default ClosedTasks;