
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO Dim background when the window is open

// TODO Implement db push

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
      <form onSubmit={this.updateUser}>
        <label id='edit_name'>Name</label>
        <input name='user' type='text' id='input_edit_name' value={user} onChange={this.onChange}/><br/>
        <label id='edit_email'>Email</label>
        <input name='email' type='text' id='input_edit_email' value={email} onChange={this.onChange}/><br/>
        <label id='edit_github'>Github</label>
        <input name='github' disabled type='text' id='input_edit_github' value={github} onChange={this.onChange}/><br/>
        <label id='edit_role'>Role</label>
        <select value={role} name='role' disabled id='select_edit_role'>
          <option value='1'>User</option>
          <option value='2'>Admin</option>
        </select><br/>
        <button type='submit' id='edit_user_submit' disabled={isInvalid} >Confirm</button>
      </form>
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
  })
};

export default UserEditPopup;