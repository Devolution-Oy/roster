
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Modal from '../Modal';
import { withFirebase} from '../Firebase'; 
import { withAuthentication } from '../Session';
import './EditUserPopup.css';


class UserEditPopupBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user.data.displayName,
      email: props.user.data.email,
      github: props.user.data.githubUser,
      role: props.user.data.role
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  updateUser = event => {
    event.preventDefault();
    if (window.confirm('Are you sure you want to update user info?')) {
      const userData = {
        uid: this.props.user.uid,
        data: {
          displayName: this.state.user,
          email: this.state.email,
          githubUser: this.state.github,
          photo: this.props.user.data.photo,
          projects: this.props.user.data.projects,
          role: this.state.role
        }
      };
      this.props.firebase.addUserData(userData).then(res => {
        console.log('Write OK ' + res);
        this.props.user.update(userData);
        this.props.closeEdit();
      }).catch(error => {
        console.log(error);
      });
    }
  };

  render() {
    const {
      user,
      email,
      github,
      role,
    } = this.state;

    const isInvalid = 
      user === '' ||
      email === '' ||
      github === '' ||
      role === 0;
      // TODO: Add guidance text when a field is not valid
    return (
      <Modal
        title='Edit User Info'
        onCancel={this.props.closeEdit}
        onAccept={this.updateUser}
        accept='Confirm'
        disabled={isInvalid}>
        <div id='form_edit_user'>
          <label className='label__name' id='edit_name'>Name</label>
          <input name='user' type='text' id='input_edit_name' value={user} onChange={this.onChange} /><br />
          <label className='label__name' id='edit_email'>Email</label>
          <input name='email' type='text' id='input_edit_email' value={email} onChange={this.onChange} /><br />
          <label className='label__name' id='edit_github'>Github</label>
          <input name='github' disabled type='text' id='input_edit_github' value={github} onChange={this.onChange} /><br />
          <label className='label__name' id='edit_role'>Role</label>
          <select value={role} name='role' disabled id='select_edit_role'>
            <option value='1'>User</option>
            <option value='2'>Admin</option>
          </select>
        </div>
      </Modal>
    );
  }
}

UserEditPopupBase.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      githubUser: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
      photo: PropTypes.string.isRequired,
      projects: PropTypes.array.isRequired
    }),
    update: PropTypes.func.isRequired
  }),
  firebase: PropTypes.object,
  closeEdit: PropTypes.func
};

const UserEditPopup = compose( 
  withAuthentication,
  withFirebase
)(UserEditPopupBase);

export default withFirebase(UserEditPopup);