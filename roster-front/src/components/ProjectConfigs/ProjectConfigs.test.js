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
        <ProjectConfigs 
          dev={projects[0].dev}
          ux={projects[0].ux}
          testautomation={projects[0].testautomation}
          bug={projects[0].bug}
          documentation={projects[0].documentation}
          question={projects[0].question}
          design={projects[0].design}
          review={projects[0].review}
          accepted={projects[0].accepted}
          change={onChange} />
        , container
      );
    });
    expect(document.getElementById('task_prices')).toBeTruthy();
    expect(document.getElementById('config_input_dev').value).toBe('40.00');
    expect(document.getElementById('config_input_ux').value).toBe('41.10');
    expect(document.getElementById('config_input_testautomation').value).toBe('42.20');
    expect(document.getElementById('config_input_bug').value).toBe('43.30');
    expect(document.getElementById('config_input_documentation').value).toBe('44.40');
    expect(document.getElementById('config_input_question').value).toBe('45.50');
    expect(document.getElementById('config_input_design').value).toBe('46.60');
    expect(document.getElementById('config_input_review').value).toBe('47.70');
    expect(document.getElementById('config_input_accepted').value).toBe('48.80');
  });
});