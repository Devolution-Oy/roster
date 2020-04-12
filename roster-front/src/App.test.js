import React from 'react';
import App from './App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

jest.mock('./components/Navbar/GithubLoginButton');

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
