import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AssignedTasks.css';
import { withFirebase} from '../Firebase';

import ProjectTasks from './ProjectTasks';

class AssignedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      user: null,
      loading: true,
      errror: null
    };
  }

  componentDidMount() {
    this.setState({ user: this.props.user });
    this.setState({ loading: true });
    this.props.firebase.getProjects(this.props.user).then(res => {
      this.setState({ projects: res.data });
      this.setState({ loading: false });
    }).catch(err => {
      this.setState({ error: err.message });
      this.setState({ loading: false });
    });
  }

  render() {
    const projects = this.state.projects;
    const user = this.state.user;
    const loading = this.state.loading;
    const error = this.state.error;

    if (loading) {
      return <p>Loading projects...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }
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
  firebase: PropTypes.object.isRequired,
  user: PropTypes.PropTypes.string.isRequired
};

export default withFirebase(AssignedTasks);