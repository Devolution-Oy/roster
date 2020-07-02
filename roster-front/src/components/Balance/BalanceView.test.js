import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import BalanceView from './BalanceView';

describe('User\'s Balance view component', () => {
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
  it('Renders', () => {
    act(() => {
      render(
        <BalanceView />, container
      );
    });
  }); 

  it('Shows total balance label and sum', () => {
    act(() => {
      render(
        <BalanceView />, container
      );
    });
    expect(document.getElementById('description_total')).toBeTruthy();
    expect(document.getElementById('sum_total')).toBeTruthy();
  });

  it('Shows last 5 actions in form Date | Description | Amount', () => {
    act(() => {
      render(
        <BalanceView />, container
      );
    });
    expect(document.getElementById('date_recent1')).toBeTruthy();
    expect(document.getElementById('description_recent1')).toBeTruthy();
    expect(document.getElementById('amount_recent1')).toBeTruthy();
    expect(document.getElementById('date_recent2')).toBeTruthy();
    expect(document.getElementById('description_recent2')).toBeTruthy();
    expect(document.getElementById('amount_recent2')).toBeTruthy();
    expect(document.getElementById('date_recent3')).toBeTruthy();
    expect(document.getElementById('description_recent3')).toBeTruthy();
    expect(document.getElementById('amount_recent3')).toBeTruthy();
    expect(document.getElementById('date_recent4')).toBeTruthy();
    expect(document.getElementById('description_recent4')).toBeTruthy();
    expect(document.getElementById('amount_recent4')).toBeTruthy();
    expect(document.getElementById('date_recent4')).toBeTruthy();
    expect(document.getElementById('description_recent4')).toBeTruthy();
    expect(document.getElementById('amount_recent4')).toBeTruthy();

  });
});