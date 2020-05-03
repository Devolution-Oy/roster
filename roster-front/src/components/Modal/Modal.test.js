
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import Modal from './Modal';


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

const onAcceptCB = jest.fn();
const onCancelCB = jest.fn();

export const TestContent = () => (
  <div id='modal_test_content'>
    <p>The content text</p>
  </div>
);

describe('User edit window',() => {
  it('Renders', () => {
    act(() => {
      render(
        <Modal
          title='Test title'
          onAccept={onAcceptCB}
          accept="AcceptText"
          onCancel={onCancelCB}>
          <TestContent />
        </Modal>
        , container
      );
    });
    expect(container.querySelector('.modal__title').innerHTML).toBe('Test title');
    expect(document.getElementById('modal_test_content')).toBeTruthy();
    expect(container.querySelector('.btnAccept').innerHTML).toBe('AcceptText');
    expect(container.querySelector('.btnCancel').innerHTML).toBe('Cancel');
    Simulate.click(container.querySelector('.btnAccept'));
    expect(onAcceptCB).toHaveBeenCalled();
    Simulate.click(container.querySelector('.btnCancel'));
    expect(onCancelCB).toHaveBeenCalled();
  });
});