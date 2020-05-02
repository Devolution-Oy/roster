import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { normaluser } from '../../test_data';
import { UserInfo } from './UserInfo'; 

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

describe('User info table',() => {
  it('Renders', () => {
    act(() => {
      render(
        <UserInfo authUser={normaluser} />, container
      );
    });
  });
});