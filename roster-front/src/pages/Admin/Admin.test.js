import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import AdminPage from './Admin';
import { normaluser, adminuser} from '../../test_data';

jest.mock('../../components/Session/withAuthorization');
jest.mock('../../components/Session/withAuthentication');


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

describe('Admin user can add custom balance records', () => {
  it('Add custom balance modal popup is opened when "Add Record"'
     + 'button is clicked', async () => {
    act(() => {
      render(
        <AuthContext.Provider value={adminuser}>
          <AdminPage />
        </AuthContext.Provider>,
        container
      );
    });
    const addRecord = document.getElementById('btn_add_record');
    await Simulate.click(addRecord);
    expect(document.getElementById('modal_add_record')).toBeTruthy();
  });
});
