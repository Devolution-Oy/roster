import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.userRef = React.createRef();
    this.pwRef = React.createRef();
  }


  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="user">Username</label>
          <input type="text" id="user" ref={this.userRef} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.pwRef} />
        </div>
        <div className="form-control">
          <button type="submit" id="btn_submit">Login</button>
        </div>
      </form>);
  }
}

export default AuthPage;
