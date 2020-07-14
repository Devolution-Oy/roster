import React, { Component } from 'react';

import './User.css';
import { AuthContext, withAuthorization } from '../../components/Session';
import UserInfo from '../../components/UserInfo';
import BalanceView from '../../components/Balance';
import AssignedTasks from '../../components/TasksView/AssignedTasks';


class UserPage extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {authUser => (
          <div>
            <h1>User page content will be shown here</h1>
            <BalanceView user={authUser} />
            <UserInfo authUser={authUser} />
            <AssignedTasks user={authUser.data.githubUser} />
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(UserPage);
