import { Component } from 'react';

const user = {
  additionalUserInfo: {
    isNewUser: false,
    userName: 'TestUser' 
  }
};

class Auth extends Component {

  authUser = null;
  callback = null
  
  setAuthUser = (authUser) => {
    authUser
      ? this.authUser = authUser
      : this.authUser = null;
      
    if (this.callback) {
      this.callback(this.authUser);
    }
  }

  onAuthStateChanged = ((cb) => {
    if (cb) {
      this.callback = cb;
      cb(this.authUser);
    }
    else {
      this.callback = null;
    }
  });
}

class Firebase {
  constructor() {
    this.auth = new Auth();
  }

  githubAuth = () => {
    return new Promise((resolve) => {
      this.auth.setAuthUser(user);
      resolve(user);
    });
  };

  doSignOut = () => {
    return new Promise((resolve) => {
      this.auth.setAuthUser(null);
      resolve(null);
    });
  }
}

export default Firebase;