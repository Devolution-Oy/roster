import React, { Component } from 'react';

import './User.css';
import { AuthContext, withAuthorization } from '../../components/Session';
import UserInfo from '../../components/UserInfo';

// TODO: Show edit popup when info button is clicked
class UserPage extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {authUser => (
          <div>
            <h1>User page content will be shown here</h1>
            <UserInfo authUser={authUser} />
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(UserPage);
