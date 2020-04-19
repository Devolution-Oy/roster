import React from 'react';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

jest.mock('./components/GithubLogin/GithubLoginButton');
jest.mock('./components/Firebase/firebase');
jest.mock('./components/Session/withAuthorization');
jest.mock('./components/Session/withAuthentication');

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

test('The App renders', () => {
  act(() => {
    render(
      <FirebaseContext.Provider value={new Firebase()}>
        <App />;
      </FirebaseContext.Provider>, container);
  });
});
