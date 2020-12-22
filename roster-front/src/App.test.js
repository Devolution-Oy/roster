import React from 'react';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

jest.mock('./components/GithubLogin/GithubLoginButton');
jest.mock('./components/Firebase/firebase');
jest.mock('./components/Session/withAuthorization');
jest.mock('./components/Session/withAuthentication');

const firebase = new Firebase();
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

describe('The roster APP', () => {
  it('renders', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <App />;
        </FirebaseContext.Provider>
        , container);
    });
  });

  it('Fetch projects from firestore', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <App />;
        </FirebaseContext.Provider>
        , container);
    });
    expect(firebase.getProjects).toHaveBeenCalled();
  });
});
