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
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const stagingConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_STAGING,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_STAGING,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_STAGING,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_STAGING,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_STAGING,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_STAGING,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_STAGING,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_STAGING
};

const prConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_PR,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_PR,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_PR,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_PR,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PR,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_PR,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_PR,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_PR
};

const devConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_DEV,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_DEV,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_DEV,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_DEV,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_DEV,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_DEV
};

var config = null;
switch (process.env.DEPLOY_ENV) {
case 'production':
  config = prodConfig; 
  break;
case 'staging':
  config = stagingConfig; 
  break;
case 'pr':
  config = prConfig; 
  break;
case 'dev':
  config = devConfig; 
  break;
default:
  config = devConfig; 
  break;
}

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.functions = app.functions();
    this.provider = new app.auth.GithubAuthProvider();
  }

  githubAuth = () => {
    return this.auth.signInWithPopup(this.provider);
  };

  doSignOut = () => 
    this.auth.signOut();

  addUserData = user => {
    const addUser = this.functions.httpsCallable('addUser');
    return addUser(user).then(res => {
      console.log('Write OK ' + res);
    }).catch(error => {
      console.log(error);
    });
  }

  getUserData = uid => {
    const getUser = this.functions.httpsCallable('getUser');
    return getUser({uid: uid});
  };
}

export default Firebase;
