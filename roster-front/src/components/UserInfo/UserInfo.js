import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserEditPopup from '../EditUserPopup/EditUserPopup';
import Backdrop from '../Backdrop';
import { UserInfoTable } from './UserInfoTable';

import './UserInfo.css';


class UserInfo extends Component {
  state = {
    showEdit: false
  };

  showEdit = () => {
    this.setState({showEdit: true});
  }

  closeEdit = () => {
    this.setState({showEdit: false});
  }

  render() {
    return (
      <div className='user_info'>
        <h2>My Profile</h2>
        <UserInfoTable showEdit={this.showEdit} authUser={this.props.authUser} />
        {this.state.showEdit &&
        <div>
          <Backdrop />
          <UserEditPopup closeEdit={this.closeEdit} user={this.props.authUser} />
        </div>}
      </div>
    );
  }
} 

UserInfo.propTypes = {
  authUser: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      githubUser: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
    })
  })
};

export default UserInfo;
