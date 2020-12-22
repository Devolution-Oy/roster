import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import Firebase, { FirebaseContext } from '../Firebase';
import BalanceView from './BalanceView';

import { normaluser } from '../../test_data';

jest.mock('../Firebase/firebase');

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

  const flushPromises = () => new Promise(setImmediate);

  it('Renders with firebase contex and user info props', async () => {
    act(() => {
      render(
        <FirebaseContext.Provider value={new Firebase()}>
          <BalanceView user={normaluser}/>
        </FirebaseContext.Provider>, container
      );
    });

    await flushPromises();
    expect(document.getElementById('balance_view')).toBeTruthy();
    expect(document.getElementById('sum_total').innerHTML).toBe('12345.00 €');
    expect(document.getElementById('balanceview_total_row')).toBeTruthy();
    expect(document.getElementById('date_recent_0')).toBeTruthy();
    expect(document.getElementById('description_recent_0')).toBeTruthy();
    expect(document.getElementById('amount_recent_0').innerHTML).toBe('50.00 €');
    expect(document.getElementById('date_recent_1')).toBeTruthy();
    expect(document.getElementById('description_recent_1')).toBeTruthy();
    expect(document.getElementById('amount_recent_1').innerHTML).toBe('-51.00 €');
    expect(document.getElementById('date_recent_2')).toBeTruthy();
    expect(document.getElementById('description_recent_2')).toBeTruthy();
    expect(document.getElementById('amount_recent_2').innerHTML).toBe('49.99 €');
    expect(document.getElementById('date_recent_3')).toBeTruthy();
    expect(document.getElementById('description_recent_3')).toBeTruthy();
    expect(document.getElementById('amount_recent_3').innerHTML).toBe('50.00 €');
    expect(document.getElementById('date_recent_4')).toBeTruthy();
    expect(document.getElementById('description_recent_4')).toBeTruthy();
    expect(document.getElementById('amount_recent_4').innerHTML).toBe('52.00 €');

  }); 
});