import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Firebase, { FirebaseContext } from '../../components/Firebase';

import AddRecord from './AddRecord';

const closeAddRecord = jest.fn();

jest.mock('../Firebase/firebase');

const firebase = new Firebase();
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

describe('Add post custom record popup', () => {

  it('Loads user list from firestore', () => {
    act(()=> {
      render(
        <FirebaseContext.Provider value={firebase}>
          <AddRecord closeAddRecord={closeAddRecord} />, container
        </FirebaseContext.Provider>
        , container
      );
      expect(firebase.getUsers).toHaveBeenCalled();
    });
  });
});