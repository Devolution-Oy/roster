import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../Session/SignOut';
import { AuthContext} from '../Session'; 

const Navbar = () => (
  <header className="navbar">
    <div className="navbari__logo"> 
      <h1>Devolution Roster</h1>
    </div>
    <div>
      <nav className="navbar__item">
        <AuthContext.Consumer>
          {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </AuthContext.Consumer>
      </nav>
    </div>
  </header>
);

const NavigationNonAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}> Front </Link></li>
    <li><Link to={ROUTES.AUTH}> Login </Link></li>
  </ul>
);

const NavigationAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}> Front </Link></li>
    <li><Link to={ROUTES.USER}> Home </Link></li>
    <li><Link to={ROUTES.ADMIN}> Admin </Link></li>
    <li><SignOutButton /></li>
  </ul>
);

export default Navbar;
