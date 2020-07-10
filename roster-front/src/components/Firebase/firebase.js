import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';


const prodConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const stagingConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_STAGING,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_STAGING,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_STAGING,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_STAGING,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_STAGING,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_STAGING,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_STAGING
};

const prConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_PR,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PR,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_PR,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PR,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PR,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_PR,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_PR
};

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_DEV,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_DEV,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_DEV,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_DEV,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_DEV
};

var config = null;
var testerUid = '';
const deploy_env = process.env.REACT_APP_DEPLOY_ENV;

switch (deploy_env) {
case 'production':
  config = prodConfig;
  testerUid = process.env.REACT_APP_TESTER_UID;
  break;
case 'staging':
  config = stagingConfig;
  testerUid = process.env.REACT_APP_TESTER_UID_STAGING;
  break;
case 'pr':
  config = prConfig;
  testerUid = process.env.REACT_APP_TESTER_UID_PR;
  break;
case 'dev':
  config = devConfig;
  testerUid = process.env.REACT_APP_TESTER_UID_DEV;
  break;
default:
  config = devConfig;
  testerUid = process.env.REACT_APP_TESTER_UID_DEV;
  break;
}

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.functions = app.functions();
    this.provider = new app.auth.GithubAuthProvider();
    this.loginTestUid = testerUid;
  }

  testLoginUid = () => {
    return this.loginTestUid;
  }

  githubAuth = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  doSignOut = () => 
    this.auth.signOut();

  addUserData = user => {
    const addUser = this.functions.httpsCallable('addUser');
    return addUser(user);
  }

  getUserData = uid => {
    // TODO: Get also user's projects. Required for #136
    const getUser = this.functions.httpsCallable('getUser');
    return getUser({uid: uid});
  };

  testLogin = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  getUserBalance = (github) => {
    const getBalance = this.functions.httpsCallable('getUserBalance');
    console.log('Calling get balance');
    return getBalance({user: github});
  };

  getUsers = () => {
    const getUsers = this.functions.httpsCallable('getUsers');
    return getUsers();
  };

  getProjects = () => {
    const getProjects = this.functions.httpsCallable('getProjects');
    return getProjects();
  }

  postCustomRecord = (record) => {
    const postCustomRecord = this.functions.httpsCallable('postCustomRecord');
    return postCustomRecord(record);
  }

  updateProject = project => {
    const updateProject = this.functions.httpsCallable('updateProject');
    return updateProject(project);
  }
}

export default Firebase;
