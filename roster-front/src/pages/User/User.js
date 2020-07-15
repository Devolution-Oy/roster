import React, { Component } from 'react';

import './User.css';
import { AuthContext, withAuthorization } from '../../components/Session';
import UserInfo from '../../components/UserInfo';
import BalanceView from '../../components/Balance';
import AssignedTasks from '../../components/TasksView/AssignedTasks';
import PropTypes from 'prop-types';
import ProjectView from '../../components/ProjectView/ProjectView';

class UserPage extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects
    };
  }

  render() {
    const authUser = this.context;
    
    const projects = this.state.projects ? this.state.projects.filter(project => {
      return (project.contributors.includes(this.context.data.githubUser));
    }) : null;

    return (
      <div>
        <h1>User page content will be shown here</h1>
        <BalanceView user={authUser} />
        <UserInfo authUser={authUser} />
        <AssignedTasks user={authUser.data.githubUser} projects={projects} />
        {
          projects ? projects.map((project, i) => {
            return <ProjectView key={i} project={project} />;
          }) : null
        }
      </div>
    );
  }
}

UserPage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      github: PropTypes.bool,
      contributors: PropTypes.arrayOf(PropTypes.string).isRequired
    }
  ))
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(UserPage);
