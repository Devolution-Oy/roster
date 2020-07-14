import { Component } from 'react';
import { users, projects } from '../../../test_data/index.js';

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

const userBalance = {
  total: 12345.00,
  records: [
    { date: '2020-06-06 12:12:12', description: 'Did something', amount: 50.00 },
    { date: '2020-06-06 11:12:12', description: 'Bought something', amount: -51 },
    { date: '2020-06-06 10:12:12', description: 'Did something', amount: 49.99 },
    { date: '2020-06-06 09:12:12', description: 'Bought something', amount: 50 },
    { date: '2020-06-06 08:12:12', description: 'Did something', amount: 52 }
  ]
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

  getUserBalance = jest.fn((_github, _records) => {
    return new Promise((resolve) => {
      resolve({data: userBalance});
    });
  });

  getUsers = jest.fn(() => {
    return new Promise((resolve) => {
      console.log('firebse mock get users');
      resolve({data: users});
    });
  });

  getProjects = jest.fn((user) => {
    const userProjects = projects.filter((project) => {
      return (project.contributors.includes(user) || !user);
    });
    return new Promise((resolve) => {
      console.log('firebse mock get projects');
      resolve({data: userProjects});
    });
  });

  postCustomRecord = jest.fn(() => {
    console.log('firebase mock postCustomrecord');
    return new Promise((resolve) => {
      resolve({ status: 200, message: 'OK' });
    });
  });

  updateProject = jest.fn((data) => {
    console.log('firebase mock postCustomrecord');
    if (!data.project && data.balance)
      throw 'Error';
    return new Promise((resolve) => {
      resolve({ status: 200, message: 'OK' });
    });
  })
}

export default Firebase;