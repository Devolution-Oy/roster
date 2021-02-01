import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { projects, flushPromises } from '../../test_data/index.js';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import ClosedTasks from './ClosedTasks';

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

describe('ClosedTasks',() => {
  it('Loads closed tasks for the projects from github',async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <ClosedTasks project={projects[0].name} />
        </FirebaseContext.Provider>
        , container);
    });

    await flushPromises();
    expect(container.querySelector('.project_latest')).toBeTruthy();
    expect(firebase.getRecords).toHaveBeenCalledWith(projects[0].name);
    expect(container.querySelectorAll('.td_amount')).toHaveLength(3);
  });

  it('Closed tasks are in a scrol area', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <ClosedTasks project={projects[0].name} />
        </FirebaseContext.Provider>
        , container);
    });

    await flushPromises();
    expect(container.querySelector('.scroll_closed_tasks')).toBeTruthy();
  });

});