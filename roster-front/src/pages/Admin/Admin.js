import React, { Component } from 'react';

import { withAuthorization } from '../../components/Session';
import * as ROLES from '../../constants/roles';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddRecordPopup from '../../components/AddRecord';


class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      showAddRecord: false,
    };
  }

  showAddRecord = () => {
    this.setState({showAddRecord: true});
  }

  closeAddRecord = () => {
    this.setState({showAddRecord: false});
  }

  render() {
    return (
      <div>
        <h1 className='admin-header'>Admin page content</h1>
        <button onClick={this.showAddRecord} id='btn_add_record'>Add Record</button>
        {this.state.showAddRecord &&
          <div>
            <Backdrop />
            <AddRecordPopup closeAddRecord={this.closeAddRecord} />
          </div>
        }
      </div>
    );
  }
}

const condition = authUser => {
  if (!authUser || !authUser.data.role)
    return false;
  return authUser.data.role === ROLES.ADMIN;
};
export default withAuthorization(condition)(AdminPage);
