import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubRequests from '../GithubRequests/GithubRequests';
import TaskItem from '../TasksView/TaskItem';
import ScrollBar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './ReadyTasks.css';

class ReadyTasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const issues = this.props.tasks;
    if (!issues) {
      return (
        <div className='project_ready'>
          <h4>Ready for implementation</h4>
          <p>Loading issues...</p>
        </div>);
    }

    return (
      <div className='project_ready'>
        <h4>Ready for implementation</h4>
        <ScrollBar className='scroll_ready_tasks' component='div' >
          <div className='ready_tasks'>
            {issues ? issues.map((issue, i) => {
              return <TaskItem key={i} labels={issue.labels} title={issue.title} />;
            }) : <p>No implementation ready tasks</p>}
          </div>
        </ScrollBar>
      </div>
    );
  }
}

ReadyTasks.propTypes = {
  project: PropTypes.string.isRequired,
  tasks: PropTypes.array
};

export default ReadyTasks;