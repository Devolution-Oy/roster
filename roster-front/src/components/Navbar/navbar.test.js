import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import NavigationNonAuth from './index';

jest.mock('./GithubLoginButton');

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

test('Non-Autohrized navbar contains github login button', () => {
  act(() =>  {
    render(
      <Router>
        <NavigationNonAuth />
      </Router>, container
    );
  });

  expect(container.querySelector('.btn_github')).toBeTruthy();
});
