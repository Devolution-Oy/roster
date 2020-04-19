import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import AdminPage from './Admin';
import * as ROLES from '../../constants/roles';

jest.mock('../../components/Session/withAuthorization');
jest.mock('../../components/Session/withAuthentication');

const adminuser = {username: 'test', role: ROLES.ADMIN};
const normaluser = {username: 'test', role: ROLES.USER};

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

describe('Admin level user can see content', () => {
  it('Admin page render when user has ROLE ADMIN,', () => {
    act(() => {
      render(
        <AuthContext.Provider value={adminuser}>
          <AdminPage />
        </AuthContext.Provider>,
        container
      );
    });
    expect(container.querySelector('.admin-header').textContent).toBe('Admin page content');
  });

  it('Admin page does not render when user has ROLE USER,', () => {
    act(() => {
      render(
        <AuthContext.Provider value={normaluser}>
          <AdminPage />
        </AuthContext.Provider>,
        container
      );
    });
    expect(container.querySelector('.admin-header')).toBeNull();
  });
});