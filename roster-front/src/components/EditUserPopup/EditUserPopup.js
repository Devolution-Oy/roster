
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './EditUserPopup.css';

// TODO: Use components/Modal component
// TODO: Implement db push

class UserEditPopup extends Component {
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
      <div className='modal'>
        <header className='modal__header'>
          <h1>Edit User Info</h1>
        </header>
        <section className='modal__content' >
          <form id='form_edit_user' onSubmit={this.updateUser}>
            <label id='edit_name'>Name</label>
            <input name='user' type='text' id='input_edit_name' value={user} onChange={this.onChange} /><br />
            <label id='edit_email'>Email</label>
            <input name='email' type='text' id='input_edit_email' value={email} onChange={this.onChange} /><br />
            <label id='edit_github'>Github</label>
            <input name='github' disabled type='text' id='input_edit_github' value={github} onChange={this.onChange} /><br />
            <label id='edit_role'>Role</label>
            <select value={role} name='role' disabled id='select_edit_role'>
              <option value='1'>User</option>
              <option value='2'>Admin</option>
            </select><br />
            <section className='modal__actions'>
              <button type='submit' id='btn_edit_user_submit' disabled={isInvalid} >Confirm</button>
              <button id='btn_edit_user_cancel' onClick={this.props.closeEdit} >Cancel</button>
            </section>
          </form>
        </section>
      </div >
    );
  }
}

UserEditPopup.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      githubUser: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
    })
  }),
  closeEdit: PropTypes.func
};

export default UserEditPopup;