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
    GithubRequests.getImplementationReadyIssues.mockResolvedValue({data: githubTasks});
    act(() => {
      render(
        <ReadyTasks project={projects[0].name} />
        , container);
    });

    await flushPromises();
    expect(container.querySelector('.project_ready')).toBeTruthy();
    expect(container.querySelectorAll('.task_item')).toHaveLength(2);
  });

});