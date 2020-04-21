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

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
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
    return getUser(uid);
  };
}

export default Firebase;
