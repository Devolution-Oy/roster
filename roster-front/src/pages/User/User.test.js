import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import UserPage from './User';
import { normaluser } from '../../test_data';

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

describe('User info', () => {
  it('User info is shown on the page', () => {
    act(() => {
      render(
        <AuthContext.Provider value={normaluser}>
          <UserPage />
        </AuthContext.Provider>, container
      );
    });
    expect(document.getElementById('div_user_info')).toBeTruthy();
    expect(document.getElementById('user_name')).toBeTruthy();
    expect(document.getElementById('user_email')).toBeTruthy();
    expect(document.getElementById('user_github')).toBeTruthy();
    expect(document.getElementById('user_role')).toBeTruthy();
    expect(document.getElementById('btn_edit_user')).toBeTruthy();
  });

  it('EditUserPopUp is shown when Edit is clicked', () => {
    act(() => {
      render(
        <AuthContext.Provider value={normaluser}>
          <UserPage />
        </AuthContext.Provider>, container
      );
    });
    const btnEdit = document.getElementById('btn_edit_user');
    expect(document.getElementById('form_edit_user')).not.toBeTruthy();
    Simulate.click(btnEdit);
    expect(document.getElementById('form_edit_user')).toBeTruthy();
    expect(container.querySelector('.backdrop')).toBeTruthy();
    const btnClose = container.querySelector('.btn_cancel');
    Simulate.click(btnClose);
    expect(document.getElementById('form_edit_user')).not.toBeTruthy();
  });
});