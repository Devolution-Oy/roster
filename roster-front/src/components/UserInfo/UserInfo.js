import React from 'react';
import PropTypes from 'prop-types';
import { roleToString } from '../../constants/roles';

const editUser = event => {
  console.log(event.target);
  // TODO: Add user editing popup
}; 

export const UserInfo = props => (
  <div id='div_user_info'>
    <table>
      <tbody>
        <tr>
          <td>
            <label id='user_name'>Name:</label><br />
          </td>
          <td>
            <label id='user_name_value'>{props.authUser.data.displayName}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label id='user_email'>Email</label><br />
          </td>
          <td>
            <label id='user_email_value'>{props.authUser.data.email}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label id='user_github'>Github</label><br />
          </td>
          <td>
            <label id='user_github_value'>{props.authUser.data.githubUser}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label id='user_role'>Role</label><br />
          </td>
          <td>
            <label id='user_role_value'>{roleToString(props.authUser.data.role)}</label><br />
          </td>
        </tr>
        <tr>
          <td><button id='btn_edit_user' onClick={editUser}> Edit </button></td>
        </tr>
      </tbody>
    </table>
  </div>
);

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
