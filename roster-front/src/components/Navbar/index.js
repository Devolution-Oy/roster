import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from '../../roster-logo.jpg';
import * as ROUTES from '../../constants/routes';
import { AuthContext} from '../Session'; 

import SignOutButton from '../Session/SignOut';
import GithubLoginButton from './GithubLoginButton';

class Navbar extends Component {

  render() {
    return(
      <header className='navbar'>
        <div className='navbar__logo'> 
          <img src={logo} alt='Roster logo'/>
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
  }
}

const NavigationNonAuth = () => (
  <ul>
    <li><GithubLoginButton /></li>
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
