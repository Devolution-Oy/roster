import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class GithubLoginButtonBase extends Component {
  
  createNewUserRecord = user => {
    const record = {
      uid: user.user.uid,
      data: {
        githubUser: user.additionalUserInfo.username,
        displayName: user.user.displayName,
        email: user.user.email,
        photo: user.user.photoURL,
        projects: [],
        role: ROLES.USER,
      }
    };
    this.props.firebase.addUserData(record);
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.firebase.githubAuth().then((result) => {
      if (result.additionalUserInfo.isNewUser)
      {
        this.createNewUserRecord(result);
      }
        
      this.props.history.push(ROUTES.USER);
    }).catch(error => {
      console.log({error});
    });
  }
  
  render() {
    return(
      <GithubButton type='light' onClick={this.submitHandler} id='btn_github' />
    );
  }
}

GithubLoginButtonBase.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const GithubLoginButton = compose(
  withRouter,
  withFirebase,
)(GithubLoginButtonBase);

export default GithubLoginButton;
