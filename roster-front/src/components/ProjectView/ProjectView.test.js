import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProjectView from './ProjectView';
import Firebase, { FirebaseContext } from '../Firebase/index.js';
import GithubRequests from '../GithubRequests/GithubRequests.js';
import { projects, flushPromises, githubTasks } from '../../test_data/index.js';

jest.mock('../GithubRequests');
jest.mock('../Firebase/firebase');

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

describe('ProjectView', () => {
  it('Shows project name, balance, latest action and dev.ready issues', async () => {
    GithubRequests.getImplementationReadyIssues.mockResolvedValue({data: githubTasks});
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <ProjectView project={projects[0]} />
        </FirebaseContext.Provider>
        , container
      );
    });
    await flushPromises();
    expect(container.querySelector('.project_view')).toBeTruthy();
    expect(container.querySelector('.project_header')).toBeTruthy();
    expect(container.querySelector('.project_budget')).toBeTruthy();
    expect(container.querySelector('.project_latest')).toBeTruthy();
    expect(container.querySelector('.project_ready')).toBeTruthy();
  });
});