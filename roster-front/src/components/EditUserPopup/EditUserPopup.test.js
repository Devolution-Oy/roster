import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { normaluser } from '../../test_data';
import UserEditPopup from './EditUserPopup';
import Firebase, { FirebaseContext } from '../Firebase';
import { AuthContext } from '../Session';

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

window.confirm = jest.fn(() => true);
const userData = normaluser;
const closeEdit = jest.fn();
const updateUser = jest.fn();

describe('User edit window',() => {
  it('Renders', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={normaluser}>
            <UserEditPopup closeEdit={closeEdit}  user={{...normaluser, update: updateUser}} />
          </AuthContext.Provider>
        </FirebaseContext.Provider>,container
      );
    });
    expect(document.getElementById('edit_name')).toBeTruthy();
    expect(document.getElementById('input_edit_name')).toBeTruthy();
    expect(document.getElementById('edit_email')).toBeTruthy();
    expect(document.getElementById('edit_github')).toBeTruthy();
    expect(document.getElementById('input_edit_github')).toBeTruthy();
    expect(document.getElementById('edit_role')).toBeTruthy();
    expect(document.getElementById('select_edit_role')).toBeTruthy();
    expect(container.querySelector('.btn_accept')).toBeTruthy();
    expect(document.getElementById('input_edit_github')).toBeDisabled();
    expect(document.getElementById('select_edit_role')).toBeDisabled();
  });

  it('Submit button is disabled if any of the input fields is empty', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={normaluser}>
            <UserEditPopup closeEdit={closeEdit}  user={{...normaluser, update: updateUser}} />
          </AuthContext.Provider>
        </FirebaseContext.Provider>, container
      );
    });
    const nameInput = document.getElementById('input_edit_name');
    const emailInput = document.getElementById('input_edit_email');
    const editSubmit = container.querySelector('.btn_accept');
    Simulate.change(nameInput, { target: { name: 'user', value: ''  }}); 
    expect(editSubmit).toBeDisabled();
    Simulate.change(nameInput, { target: { name: 'user', value: 'NewName' }}); 
    expect(editSubmit).not.toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'email', value: '' }}); 
    expect(editSubmit).toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'email', value: 'NewEmail' }}); 
    expect(editSubmit).not.toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'github', value: '' }}); 
    expect(editSubmit).toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'github', value: 'newgithub' }}); 
    expect(editSubmit).not.toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'role', value: 0 }}); 
    expect(editSubmit).toBeDisabled();
    Simulate.change(emailInput, { target: { name: 'role', value: 1 }}); 
    expect(editSubmit).not.toBeDisabled();
  });

  it('Firebase addUser is called when Confirm button is clicked', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <AuthContext.Provider value={normaluser}>
            <UserEditPopup closeEdit={closeEdit}  user={{...normaluser, update: updateUser}} />
          </AuthContext.Provider>
        </FirebaseContext.Provider>, container
      );
    });
    userData.data.displayName = 'UpdateName';
    userData.data.email = 'UpdatedEmail';
    const nameInput = document.getElementById('input_edit_name');
    const emailInput = document.getElementById('input_edit_email');
    const editSubmit = container.querySelector('.btn_accept');
    Simulate.change(nameInput, { target: { name: 'user', value: userData.data.displayName }}); 
    Simulate.change(emailInput, { target: { name: 'email', value: userData.data.email }}); 
    await Simulate.click(editSubmit);
    expect(updateUser).toHaveBeenCalledWith(userData);
    expect(closeEdit).toHaveBeenCalled();
  });
});