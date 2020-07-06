import React from 'react';
import PropTypes from 'prop-types';

export const AddRecord = (props) => {
  const users = props.users;
  const projects = props.projects;
  const error = props.error;

  if (error) {
    return (<p>{error}</p>);
  }

  if (!users || !projects) {
    return (<p>Loading users and projects...</p>);
  }

  return (
    <div id='form_add_record'>
      <label>User</label>
      <select>
        {
          users.map((user, i) => {
            return (<option key={i}>{user.data.githubUser}</option>);
          })
        }
      </select>
      <label>Project</label>
      <label>Description</label>
      <label>Issue</label>
    </div>
  );
};

AddRecord.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      githubUser: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
      photo: PropTypes.string.isRequired,
      projects: PropTypes.array.isRequired
    })
  })),
  projects: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.object
};
