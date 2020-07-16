import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { projects } from '../../test_data/index.js';
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
  it('Loads closed tasks for the projects from github',() => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <ClosedTasks project={projects[0].name} />
        </FirebaseContext.Provider>
        , container);
    });

    expect(container.querySelector('.project_latest')).toBeTruthy();
    expect(firebase.getRecords).toHaveBeenCalledWith(projects[0].name);
  });

});