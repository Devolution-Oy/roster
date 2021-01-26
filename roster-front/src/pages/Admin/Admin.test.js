import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';

import { AuthContext } from '../../components/Session';
import AdminPage from './Admin';
import { normaluser, adminuser, flushPromises} from '../../test_data';
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

describe('Admin level user can see content', () => {
  it('Admin page render when user has ROLE ADMIN,', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={adminuser}>
            <AdminPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>
        , container
      );
    });
    expect(container.querySelector('.admin-header').textContent).toBe('Admin page content');
  });

  it('Admin page does not render when user has ROLE USER,', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={normaluser}>
            <AdminPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>
        , container
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
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={adminuser}>
            <AdminPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>
        , container
      );
    });
    await flushPromises();
    const addRecord = document.getElementById('btn_add_record');
    await Simulate.click(addRecord);
    await flushPromises();
    expect(document.getElementById('modal_add_record')).toBeTruthy();
  });
});

describe('Admin user can create/update project', () => {
  it('Open project update modal when "Projects" button is clicked', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={adminuser}>
            <AdminPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>
        , container
      );
    });
    const btnProject = document.getElementById('btn_projects');
    await Simulate.click(btnProject);
    await flushPromises();
    expect(document.getElementById('modal_projects')).toBeTruthy();

  });
});

describe('User balance query', () => {
  it('Admin user can query user\'s balance by selecting a user', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={adminuser}>
            <AdminPage />
          </AuthContext.Provider>
        </FirebaseContext.Provider>
        , container
      );
    });
    await flushPromises();
    const selectUser = document.getElementById('select_user');
    Simulate.click(selectUser);
    const user = document.getElementById('option_testuser1');
    expect(user).toBeTruthy();
    Simulate.click(user);
  });
});
