import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { projects } from '../../test_data/index.js';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import ReadyTasks from '../ImplementionReadyTasks';

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

describe('ReadyTasks',() => {
  it('Renders',() => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <ReadyTasks project={projects[0].name} />
        </FirebaseContext.Provider>
        , container);
    });

    expect(container.querySelector('.project_ready')).toBeTruthy();
  });

});