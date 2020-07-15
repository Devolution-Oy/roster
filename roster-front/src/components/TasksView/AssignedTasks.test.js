import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AssignedTasks from './AssignedTasks';
import { flushPromises, normaluser } from '../../test_data';
import { projects } from '../../test_data/index.js';

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
      const usersProjects = projects.filter(project => {
        return (project.contributors.includes(normaluser.data.githubUser));
      });
      render(
        <AssignedTasks
          user={normaluser.data.githubUser}
          projects={usersProjects} />
        , container);
    });
    await flushPromises();
    expect(document.getElementById('div_assigned_tasks')).toBeTruthy();
    expect(document.getElementById('header_my_tasks')).toBeTruthy();
    expect(document.getElementById('project1_tasks')).toBeTruthy();
    expect(document.getElementById('project2_tasks')).not.toBeTruthy();
    expect(document.getElementById('project3_tasks')).not.toBeTruthy();
  });
});