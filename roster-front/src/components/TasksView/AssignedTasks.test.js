import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AssignedTasks from './AssignedTasks';
import { flushPromises, normaluser } from '../../test_data';
import Firebase, { FirebaseContext } from '../Firebase';

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

describe('Assigned tasks container', () => {
  it('Has header and own part for each github projects', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <AssignedTasks
            user={normaluser.data.githubUser} />
        </FirebaseContext.Provider>
        , container);
    });
    await flushPromises();
    expect(document.getElementById('div_assigned_tasks')).toBeTruthy();
    expect(document.getElementById('header_my_tasks')).toBeTruthy();
    expect(document.getElementById('project1_tasks')).toBeTruthy();
    expect(document.getElementById('project2_tasks')).toBeTruthy();
    expect(document.getElementById('project3_tasks')).not.toBeTruthy();
  });
});