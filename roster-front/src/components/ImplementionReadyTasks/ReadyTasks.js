import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReadyTasks extends Component {

  componentDidMount() {
    console.log(this.props.project);
  }

  render() {
    return (
      <div className='project_ready'>
        <h4>Ready for implementation</h4>
        <label>Do something</label> 
        <label>Improve something</label> 
      </div>
    );
  }
}

ReadyTasks.propTypes = {
  project: PropTypes.string.isRequired
};

export default ReadyTasks;