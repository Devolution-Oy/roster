import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import AddRecord from './AddRecord';

const closeAddRecord = jest.fn();
window.confirm = jest.fn(() => true);

jest.mock('../Firebase/firebase');

const firebase = new Firebase();
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

const flushPromises = () => new Promise(setImmediate);

describe('Add post custom record popup', () => {

  it('Loads users and projects lists from firestore', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <AddRecord closeAddRecord={closeAddRecord} />
        </FirebaseContext.Provider>
        , container
      );
    });
    expect(firebase.getUsers).toHaveBeenCalled();
    expect(firebase.getProjects).toHaveBeenCalled();
  });

  it('Calls firebase.postCustomRecord when dialog is accepted',async () => {
    let setProject = 'project1';
    let setUser = 'testuser3';
    let setDescription = 'test description';
    let setAmount = 999.91;
    let setIssue = '84_3';

    act(()=> {
      render(
        <FirebaseContext.Provider value={firebase}>
          <AddRecord closeAddRecord={closeAddRecord} />
        </FirebaseContext.Provider>
        , container
      );
    });

    await flushPromises();

    const show_error = document.getElementById('show_error');
    const show_loading = document.getElementById('show_loading');
    const userInput = document.getElementById('select_record_user');
    const projectInput = document.getElementById('select_record_project');
    const descriptionInput = document.getElementById('input_record_description');
    const issueInput = document.getElementById('input_record_issue');
    const amountInput = document.getElementById('input_record_amount');
    expect(show_error).not.toBeTruthy();
    expect(show_loading).not.toBeTruthy();
    expect(userInput).toBeTruthy();
    Simulate.change(userInput, { target: { name: 'user', value: setUser } });
    Simulate.change(projectInput, { target: { name: 'project', value: setProject } });
    Simulate.change(descriptionInput, { target: { name: 'description', value: setDescription } });
    Simulate.change(amountInput, { target: { name: 'amount', value: setAmount } });
    Simulate.change(issueInput, { target: { name: 'issue', value: setIssue } });
    const btnConfirm = container.querySelector('.btn_accept');
    expect(btnConfirm).not.toBeDisabled();
    await Simulate.click(btnConfirm);

    expect(firebase.postCustomRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        project: setProject,
        description: setDescription,
        amount: setAmount,
        issue: setIssue,
        githubUser: setUser,
      }));
  });
});