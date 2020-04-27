import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const INITIAL_STATE = {
  email: '',
  password: ''
};

class TestLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.firebase.testLogin(email, password).then(() => {
      const record = {
        uid: this.props.firebase.testLoginUid(),
        data: {
          githubUser: 'tester_github',
          displayName: 'Devolution Tester',
          email: 'roster.test@devolution.fi',
          photo: 'no',
          projects: [],
          role: ROLES.USER,
        }
      };
      this.props.firebase.addUserData(record);

      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.USER);

    }).catch(error => {
      console.log(error);
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input name='email' value={this.state.email} type='text' id='login_field' onChange={this.onChange} />
        <input name='password' value={this.state.password} type='password' id='password' onChange={this.onChange} />
        <button type='submit' id='btn_submit'>Login</button>
      </form>
    );
  }
}

TestLogin.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const TestLoginPage = compose(
  withRouter,
  withFirebase
)(TestLogin);

export default TestLoginPage;