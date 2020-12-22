import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import withAuthentication from './withAuthentication';
import Firebase, { FirebaseContext } from '../Firebase';

jest.mock('../Firebase/firebase');

const firebase = new Firebase();
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.clearAllMocks();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const DummyComponent = withAuthentication(
  class dummyComponent extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {authUser => authUser
            ? <p className='TestUser'>Test component</p>
            : <p className='NotDefined'>Test component</p>}
        </AuthContext.Consumer>
      );
    }
  }
);

describe('Auth state change listener', () => {
  const uid = 'LoR1xY535HP6gNJNRBokMfhD8343';
  it('Auth user is set when user logs in and cleared on log out',async() => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <DummyComponent />
        </FirebaseContext.Provider>, container);
    });

    expect(container.querySelector('.NotDefined')).toBeTruthy();

    await firebase.githubAuth();
    expect(container.querySelector('.TestUser')).toBeTruthy();
    expect(firebase.getUserData).toHaveBeenLastCalledWith(uid);
    
    await firebase.doSignOut();
    expect(container.querySelector('.NotDefined')).toBeTruthy();
  });

});