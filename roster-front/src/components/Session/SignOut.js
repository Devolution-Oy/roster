import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type='button' id='btn_logout' onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.object
};
export default withFirebase(SignOutButton);
