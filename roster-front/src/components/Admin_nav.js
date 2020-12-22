import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

import './Admin_nav.css';
import AdminContext from '../context/admin-context';

class admin_nav extends Component {
  static contextType = AdminContext;

  render () {
    return (
      <nav className="admin_nav__item">
        <ul>
          <li>
            <button onClick={this.context.set_show}>Admin action1</button>
          </li>
          <li>
            <button onClick={this.context.set_show}>Admin action2</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default admin_nav;
