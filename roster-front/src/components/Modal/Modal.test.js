
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
          onCancel={onCancelCB}
          disabled={false}>
          <TestContent />
        </Modal>
        , container
      );
    });
    expect(container.querySelector('.modal__title').innerHTML).toBe('Test title');
    expect(document.getElementById('modal_test_content')).toBeTruthy();
    expect(container.querySelector('.btn_accept').innerHTML).toBe('AcceptText');
    expect(container.querySelector('.btn_cancel').innerHTML).toBe('Cancel');
    expect(container.querySelector('.btn_accept')).not.toBeDisabled();
    Simulate.click(container.querySelector('.btn_accept'));
    expect(onAcceptCB).toHaveBeenCalled();
    Simulate.click(container.querySelector('.btn_cancel'));
    expect(onCancelCB).toHaveBeenCalled();
  });

  it('Accept button is disabled if disabled=true', () => {
    act(() => {
      render(
        <Modal
          title='Test title'
          onAccept={onAcceptCB}
          accept="AcceptText"
          onCancel={onCancelCB}
          disabled={true}>
          <TestContent />
        </Modal>
        , container
      );
    });
    expect(container.querySelector('.btn_accept')).toBeDisabled();
  });
});