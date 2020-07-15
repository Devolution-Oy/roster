import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import UserPage from './User';
import { normaluser, projects, adminuser } from '../../test_data';
import Firebase, { FirebaseContext } from '../../components/Firebase';

jest.mock('../../components/Session/withAuthorization');
jest.mock('../../components/Session/withAuthentication');
jest.mock('../../components/Firebase/firebase');

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

const updateUser = jest.fn();

describe('User info', () => {
  it('User info is shown on the page', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={{ ...normaluser, update: updateUser }}>
            <UserPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>, container
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
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={{ ...normaluser, update: updateUser }}>
            <UserPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>, container
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

  it('Shows render project view for all user\'s projects', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={{ ...adminuser, update: updateUser }}>
            <UserPage projects={projects} />
          </AuthContext.Provider>
        </FirebaseContext.Provider>, container
      );
    });
    expect(document.getElementById('project_view_project1')).toBeTruthy();
    expect(document.getElementById('project_view_project2')).toBeTruthy();
    expect(document.getElementById('project_view_project3')).not.toBeTruthy();
  });
});