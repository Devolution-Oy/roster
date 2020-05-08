import React  from 'react';
import PropTypes from 'prop-types';

import { roleToString } from '../../constants/roles';


export const UserInfoTable = props => (
  <div id='div_user_info'>
    <table>
      <tbody>
        <tr>
          <td>
            <label className='label__name' id='user_name'>Name</label><br />
          </td>
          <td>
            <label className='label__value' id='user_name_value'>{props.authUser.data.displayName}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label className='label__name' id='user_email'>Email</label><br />
          </td>
          <td>
            <label className='label__value' id='user_email_value'>{props.authUser.data.email}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label className='label__name' id='user_github'>Github</label><br />
          </td>
          <td>
            <label className='label__value' id='user_github_value'>{props.authUser.data.githubUser}</label><br />
          </td>
        </tr>
        <tr>
          <td>
            <label className='label__name' id='user_role'>Role</label><br />
          </td>
          <td>
            <label className='label__value' id='user_role_value'>{roleToString(props.authUser.data.role)}</label><br />
          </td>
        </tr>
      </tbody>
    </table>
    <button id='btn_edit_user' onClick={props.showEdit}> Edit </button>
  </div>
);

UserInfoTable.propTypes = {
  authUser: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      githubUser: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
    })
  }),
  showEdit: PropTypes.func.isRequired
};