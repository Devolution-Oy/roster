import React, { Component } from 'react';

import { withAuthorization } from '../../components/Session';
import * as ROLES from '../../constants/roles';
import Backdrop from '../../components/Backdrop/Backdrop';
import AddRecordPopup from '../../components/AddRecord';
import UpdateProject from '../../components/UpdateProject';
import SelectUser from '../../components/SelectUser';
import BalanceView from '../../components/Balance';
import { withFirebase } from '../../components/Firebase';


class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: [],
      showAddRecord: false,
    };
  }

  componentDidMount() {
    this.setState({loading: true})
    this.props.firebase.getUsers().then(users => {
      this.setState({users: users.data})
      this.setState({loading: false})
    }).catch(error => {
      this.setState({loading: false})
      window.alert(error.message);
    });
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

  setUser = (event) => {
    console.log(event);
    const user = this.state.users.find(user => user.githubUser === event.target.value);
    this.setState({user: user});
  }

  render() {
    const users = this.state.users;
    const user = this.state.user;
    console.log(user);
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
        <label>Show user's balance by selecting an user</label>
        <SelectUser users={users} setUser={this.setUser}/>
        {user ? <BalanceView user={user} /> : null }
      </div>
    );
  }
}

const condition = authUser => {
  if (!authUser || !authUser.data.role)
    return false;
  return authUser.data.role === ROLES.ADMIN;
};
export default withFirebase(withAuthorization(condition)(AdminPage));

