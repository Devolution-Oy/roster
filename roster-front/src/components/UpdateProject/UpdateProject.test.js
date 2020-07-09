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
  it('Shows "Project" and "Budget" inputs', async () => {
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
});