import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import UpdateProject from './UpdateProject';

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
  it('Shows "Project" and "Budget" inputs', () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={firebase}>
          <UpdateProject closeProjects={closeProjects} />
        </FirebaseContext.Provider>
        , container);
    });
    expect(document.getElementById('input_project')).toBeTruthy();
    expect(document.getElementById('input_budget')).toBeTruthy();
  });
});