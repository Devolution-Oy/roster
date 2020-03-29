import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import AuthContext from '../context/auth-context';

const navbar = props => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="navbar">
          <div className="navbar__logo"> 
            <h1>Devolution Roster</h1>
          </div>
          <nav className="navbar__item">
            <ul>
              <li><NavLink to="/front"> Front </NavLink></li>
              {!context.token && <li>
                <NavLink to="/auth"> Login</NavLink>
               </li>}
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/admin"> Admin </NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}> Logout </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>);
    }}
  </AuthContext.Consumer>
);

export default navbar;
