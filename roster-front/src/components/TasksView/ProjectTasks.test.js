import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProjectTasks from './ProjectTasks';

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
  it('Has header and own part for each github projects', () => {
    act(() => {
      render(
        <ProjectTasks name='project1' user='tester' />
        , container);
    });
    expect(document.getElementById('project1_tasks')).toBeTruthy();
  });
});