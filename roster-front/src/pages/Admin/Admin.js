import React, { Component } from 'react';

import { withAuthorization } from '../../components/Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  render() {
    return (
      <div>
        <h1 className='admin-header'>Admin page content</h1>
      </div>
    );
  }
}

const condition = authUser => authUser.data.role === ROLES.ADMIN;
export default withAuthorization(condition)(AdminPage);
