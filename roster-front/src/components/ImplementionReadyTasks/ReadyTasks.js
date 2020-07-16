import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubRequests from '../GithubRequests/GithubRequests';
import TaskItem from '../TasksView/TaskItem';

class ReadyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: null,
      loading: null,
      error: null
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    GithubRequests.getImplementationReadyIssues(this.props.project).then(res => {
      this.setState({
        loading: false,
        issues: res.data
      });
    }).catch(err => {
      console.log(err.message);
      this.setState({
        loading: false,
        error: err.message
      });
    });
  }

  render() {
    const error = this.state.error;
    const loading = this.state.loading;
    const issues = this.state.issues;
    if (loading) {
      return (
        <div className='project_ready'>
          <h4>Ready for implementation</h4>
          <p>Loading issues...</p>
        </div>);
    }

    if (error) {
      return (
        <div className='project_ready'>
          <h4>Ready for implementation</h4>
          <p>{error}</p>
        </div>);
    }

    return (
      <div className='project_ready'>
        <h4>Ready for implementation</h4>
        {issues ? issues.map((issue, i) => {
          return <TaskItem key={i} labels={issue.labels} title={issue.title} />;
        }) : <p>No implementation ready tasks</p> }
      </div>
    );
  }
}

ReadyTasks.propTypes = {
  project: PropTypes.string.isRequired
};

export default ReadyTasks;