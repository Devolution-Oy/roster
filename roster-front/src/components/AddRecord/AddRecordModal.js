import React from 'react';
import PropTypes from 'prop-types';

export const AddRecord = (props) => {
  const users = props.users;
  const projects = props.projects;
  const error = props.error;

  if (error) {
    return (<p>{error.message}</p>);
  }

  if (!users || !projects) {
    return (<p>Loading users and projects...</p>);
  }
  console.log(users);

  return (
    <div id='form_add_record'>
      <label>User</label>
      <select id='select_user'>
        {
          users.map((user, i) => {
            return (<option key={i}>{user.githubUser}</option>);
          })
        }
      </select>
      <label>Project</label>
      <select id='select_project'>
        {
          projects.map((project, i) => {
            return (<option key={i}>{project}</option>);
          })
        }
      </select>
      
      <label>Description</label>
      <label>Issue</label>
    </div>
  );
};

AddRecord.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    githubUser: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    projects: PropTypes.array.isRequired
  })),
  projects: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.object
};
