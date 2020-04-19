import React, { Component } from 'react';
import Firebase from '../../Firebase';

class GithubLoginButton extends Component {

  submitHandler = () => {
    return Firebase.githubAuth();
  }

  render() {
    return (
      <button className='btn_github' onClick={this.submitHandler}>Github Login Button</button>
    );
  }
}

export default GithubLoginButton;
