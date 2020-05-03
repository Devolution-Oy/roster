import { Component } from 'react';

const user = {
  uid: 'LoR1xY535HP6gNJNRBokMfhD8343',
  displayName: 'Test User',
  email: 'test@test.fi',
  photoURL: 'https://testurl.fi',
  additionalUserInfo: {
    isNewUser: true,
    userName: 'tester'
  }
};

const userRecord = {
  uid: 'LoR1xY535HP6gNJNRBokMfhD8343',
  displayName: 'Test User',
  githubUser: 'testuser',
  email: 'test@test.fi',
  photo: 'https://testurl.fi',
  projects: {},
  role: 1
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

  getUserData = jest.fn(uid => {
    return new Promise((resolve) => {
      console.log(uid); 
      resolve(userRecord);
    });
  });

  addUserData = jest.fn(user => {
    return new Promise((resolve) => {
      resolve(user);
    });
  });
}

export default Firebase;