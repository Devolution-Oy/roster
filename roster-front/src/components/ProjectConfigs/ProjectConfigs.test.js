import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProjectConfigs from './ProjectConfigs';
import { projects } from '../../test_data/index';

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

const onChange = jest.fn();

describe('ProjectConfigs', () => {
  it('Has input for each project task price config', () =>{
    act(() => {
      render(
        <ProjectConfigs project={projects[0]} change={onChange} />
        , container
      );
    });
    expect(document.getElementById('task_prices')).toBeTruthy();
    expect(document.getElementById('config_input_dev')).toBeTruthy();
    expect(document.getElementById('config_input_ux')).toBeTruthy();
    expect(document.getElementById('config_input_testautomation')).toBeTruthy();
    expect(document.getElementById('config_input_bug')).toBeTruthy();
    expect(document.getElementById('config_input_documentation')).toBeTruthy();
    expect(document.getElementById('config_input_question')).toBeTruthy();
    expect(document.getElementById('config_input_design')).toBeTruthy();
    expect(document.getElementById('config_input_review')).toBeTruthy();
    expect(document.getElementById('config_input_accepted')).toBeTruthy();
  });
});