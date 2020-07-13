import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIssues } from '../GithubRequests';

class ProjectTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      loading: null,
      error: null,
      name: props.name,
      user: props.user
    };
  }

  componentDidMount() {
    this.setState({loading: 'Fetching tasks...'});
    getIssues(this.state.name, this.state.user).then(res => {
      console.log(res.data);
      this.setState({tasks: res.data});
      this.setState({loading: null});
    }).catch(err => {
      console.log(err.message);
      this.setState({loading: null});
    });
  }

  render() {
    const name = this.state.name;
    const id = this.state.name + '_tasks';
    const loading = this.state.loading;
    const tasks = this.state.tasks;

    if (loading) {
      return (
        <div id={id}>
          <h3>{name}</h3>
          <p>{loading}</p>
        </div>
      );
    }
    // TODO: Get project's tasks from github
    return (
      <div id={id}>
        <h3>{name}</h3>
        {tasks ? tasks.map((task, i) => {
          return (
            <label key={i}>{task.title}</label>
          );
        }) : <p>No open tasks</p>
        }
      </div>
    );
  }
}

ProjectTasks.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default ProjectTasks;