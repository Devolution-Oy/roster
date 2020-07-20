import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import UpdateProject from './UpdateProject';
import { flushPromises} from '../../test_data';

const closeProjects = jest.fn();
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

describe('Projects modal', () => {
  it('Shows "Project","Budget" and configs inputs', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <UpdateProject closeProjects={closeProjects} />
        </FirebaseContext.Provider>
        , container);
    });
    await flushPromises();
    expect(document.getElementById('input_project')).toBeTruthy();
    expect(document.getElementById('input_budget')).toBeTruthy();
    expect(document.getElementById('task_prices')).toBeTruthy();
    expect(document.getElementById('review_prices')).toBeTruthy();
    expect(document.getElementById('issue_creation')).toBeTruthy();
  });

  it('Loads existing project from firebase', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <UpdateProject closeProjects={closeProjects} />
        </FirebaseContext.Provider>
        , container);
    });

    await flushPromises();
    expect(firebase.getProjects).toHaveBeenCalled();
    expect(document.getElementById('input_budget').value).toBe('0.00');
    const projectInput = document.getElementById('input_project');
    Simulate.change(projectInput, { target: { name: 'project', value: 'project1' }}); 
    expect(document.getElementById('input_budget').value).toBe('15000.00');
  });

  it('Calls firebase update project when data is submitted', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <UpdateProject closeProjects={closeProjects} />
        </FirebaseContext.Provider>
        , container);
    });

    await flushPromises();
    const projectInput = document.getElementById('input_project');
    const budgetInput = document.getElementById('input_budget');
    Simulate.change(projectInput, { target: { name: 'project', value: 'project1' }}); 
    expect(document.getElementById('input_budget').value).toBe('15000.00');
    Simulate.change(budgetInput, { target: { name: 'budget', value: 10000.20 }}); 
    const btnConfirm = container.querySelector('.btn_accept');
    await Simulate.click(btnConfirm);
    expect(firebase.updateProject).toHaveBeenCalledWith({
      name: 'project1',
      budget: 10000.20,
      github: true,
      contributors: ['testuser1', 'testuser2', 'testuser3'],
      accepted: 0,
      bug: 0,
      dev: 0,
      design: 0,
      documentation: 0,
      question: 0,
      review: 0,
      testautomation: 0,
      ux: 0
    });
  });
});