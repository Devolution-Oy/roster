import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SelectUser from './SelectUser';
import Firebase, { FirebaseContext } from '../Firebase/index.js';
import GithubRequests from '../GithubRequests/GithubRequests.js';
import { users, flushPromises } from '../../test_data/index.js';

jest.mock('../GithubRequests');
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

describe('SelectUser', () => {
  it('Renders', () => {
    const setUser = jest.fn();
    act(() => {
      render(
        <SelectUser users={users} setUser={setUser} />
        ,container);
    });
  });
});