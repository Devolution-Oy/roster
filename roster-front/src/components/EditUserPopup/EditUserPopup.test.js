import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { normaluser } from '../../test_data';
import UserEditPopup from './EditUserPopup';

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

describe('User edit window',() => {
  it('Renders', () => {
    act(() => {
      render(
        <UserEditPopup user={normaluser} />, container
      );
    });
    expect(document.getElementById('edit_name')).toBeTruthy();
    expect(document.getElementById('input_edit_name')).toBeTruthy();
    expect(document.getElementById('edit_email')).toBeTruthy();
    expect(document.getElementById('edit_github')).toBeTruthy();
    expect(document.getElementById('input_edit_github')).toBeTruthy();
    expect(document.getElementById('edit_role')).toBeTruthy();
    expect(document.getElementById('select_edit_role')).toBeTruthy();
    expect(document.getElementById('edit_user_submit')).toBeTruthy();
    expect(document.getElementById('input_edit_github')).toBeDisabled();
    expect(document.getElementById('select_edit_role')).toBeDisabled();
  });

  it('Submit button is disabled if any of the input fields is empty', () => {
    act(() => {
      render(
        <UserEditPopup user={normaluser} />, container
      );
    });
    const nameInput = document.getElementById('input_edit_name');
    const emailInput = document.getElementById('input_edit_email');
    const editSubmit = document.getElementById('edit_user_submit');
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
});