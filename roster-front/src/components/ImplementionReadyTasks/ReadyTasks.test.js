import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { projects, flushPromises, githubTasks } from '../../test_data/index.js';

jest.mock('../GithubRequests');

import ReadyTasks from '../ImplementionReadyTasks';
import GithubRequests from '../GithubRequests/GithubRequests.js';

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
  it('Renders', async () => {
    act(() => {
      render(
        <ReadyTasks project={projects[0].name} tasks={githubTasks} />
        , container);
    });

    await flushPromises();
    expect(container.querySelector('.project_ready')).toBeTruthy();
    expect(container.querySelectorAll('.task_item')).toHaveLength(2);
  });

  it('Is wrapped in scroll area', async () => {
    act(() => {
      render(
        <ReadyTasks project={projects[0].name} tasks={githubTasks}  />
        , container);
    });

    await flushPromises();
    expect(container.querySelector('.scroll_ready_tasks')).toBeTruthy();
    expect(container.querySelectorAll('.task_item')).toHaveLength(2);
  });

});