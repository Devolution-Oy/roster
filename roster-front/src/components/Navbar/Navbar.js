import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import logo from '../../roster-logo.png';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthContext} from '../Session'; 

import SignOutButton from '../Session/SignOut';
import GithubLoginButton from '../GithubLogin/GithubLoginButton';

class Navbar extends Component {

  render() {
    return(
      <header className='navbar'>
        <div className='navbar__logo'> 
          <img src={logo} alt='Roster logo'/>
        </div>
        <div className='navbar__items'>
          <nav className="navbar__item">
            <AuthContext.Consumer>
              {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
            </AuthContext.Consumer>
          </nav>
        </div>
        <div className='navbar__spacer'></div> 
      </header>
    );
  }
}

export const NavigationNonAuth = () => (
  <ul>
    <li><GithubLoginButton /></li>
  </ul>
);

export const NavigationAuth = () => (
  <ul>
    <li><button><Link className='linkLanding' to={ROUTES.LANDING}> Front </Link></button></li>
    <li><button><Link className='linkUser' to={ROUTES.USER}> User </Link></button></li>
    <AuthContext.Consumer>
      {authUser => authUser.data.role === ROLES.ADMIN ?
        <li><button><Link className='linkAdmin' to={ROUTES.ADMIN}> Admin </Link></button></li> : null}
    </AuthContext.Consumer>
    <li><SignOutButton /></li>
  </ul>
);


export default Navbar;
