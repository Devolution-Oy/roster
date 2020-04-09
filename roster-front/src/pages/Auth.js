import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import './Auth.css';


class AuthPage extends Component {

  render() {
    return (
      <div>
        <h1>Login with github</h1>
        <LoginForm />
      </div>
    );
  }
}


class LoginFormBase extends Component {

  submitHandler = (event) => {
    event.preventDefault();
    this.props.firebase.githubAuth(); 
    this.props.history.push(ROUTES.USER);
  }

  render() {
    return(
      <form className="login-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <button type="submit" id="btn_submit">Login</button>
        </div>
      </form>
    );
  }
}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default AuthPage;
