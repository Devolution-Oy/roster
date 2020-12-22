import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../Session';
import Firebase, { FirebaseContext } from '../Firebase';
import { normaluser, adminuser } from '../../test_data';

jest.mock('../GithubLogin/GithubLoginButton');
jest.mock('../Session/withAuthorization');
jest.mock('../Session/withAuthentication');
jest.mock('../Firebase/firebase');


let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Navbar user access',() => {
  it('Non-Autohrized navbar contains github login button', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <Router>
            <AuthContext.Provider value={null} >
              <Navbar />
            </AuthContext.Provider>
          </Router>
        </FirebaseContext.Provider>
        , container);
    });
    expect(document.getElementById('btn_github')).toBeTruthy();
  });

  it('Admin level user can see admin page link',() => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <Router>
            <AuthContext.Provider value={adminuser}>
              <Navbar />
            </AuthContext.Provider>
          </Router>
        </FirebaseContext.Provider>
        , container);
    });
    
    expect(container.querySelector('.linkLanding')).toBeTruthy();
    expect(container.querySelector('.linkUser')).toBeTruthy();
    expect(container.querySelector('.linkAdmin')).toBeTruthy();
  });

  it('Normal user cant see admin page link',() => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <Router>
            <AuthContext.Provider value={normaluser}>
              <Navbar />
            </AuthContext.Provider>
          </Router>
        </FirebaseContext.Provider>
        , container);
    });
    
    expect(container.querySelector('.linkLanding')).toBeTruthy();
    expect(container.querySelector('.linkUser')).toBeTruthy();
    expect(container.querySelector('.linkAdmin')).toBeNull();
  });
});
