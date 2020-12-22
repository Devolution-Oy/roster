import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TaskItem from './TaskItem';

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

describe('TaskItem',() => {
  const labels = [
    {
      title: 'dev',
      color: 'fefefe'
    },
    {
      title: 'UX',
      color: '00ff00'
    }
  ];

  it('Shows task title and labels', () => {
    act(() => {
      render(
        <TaskItem title='Hello!' labels={labels} />
        , container);
    });
    expect(document.getElementsByClassName('.task_item')).toBeTruthy();
  });
});