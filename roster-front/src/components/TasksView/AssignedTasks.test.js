import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AssignedTasks from './AssignedTasks';
import { projects } from '../../test_data';

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
        <AssignedTasks projects={projects} />
        , container);
    });
    expect(document.getElementById('div_assigned_tasks')).toBeTruthy();
    expect(document.getElementById('header_my_tasks')).toBeTruthy();
  });
});