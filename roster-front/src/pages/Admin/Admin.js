import React, { Component } from 'react';

import { withAuthorization } from '../../components/Session';
import * as ROLES from '../../constants/roles';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddRecordPopup from '../../components/AddRecord';
import UpdateProject from '../../components/UpdateProject';


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

  showProjects = () => {
    this.setState({showProjects: true});
  }

  closeProjects = () => {
    this.setState({showProjects: false});
  }
  render() {
    return (
      <div>
        <h1 className='admin-header'>Admin page content</h1>
        <button onClick={this.showAddRecord} id='btn_add_record'>Add Record</button>
        <button onClick={this.showProjects} id='btn_projects'>Edit Projects</button>
        {this.state.showAddRecord &&
          <div>
            <Backdrop />
            <AddRecordPopup closeAddRecord={this.closeAddRecord} />
          </div>}
        {
          this.state.showProjects && 
          <div>
            <Backdrop />
            <UpdateProject closeProjects={this.closeProjects} />
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
