import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import './Navbar.css';
import logo from '../../roster-logo.jpg';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../Session/SignOut';
import { AuthContext} from '../Session'; 
import { withFirebase } from '../Firebase';

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

class NavigationNonAuthBase extends Component {

  submitHandler = (event) => {
    event.preventDefault();
    this.props.firebase.githubAuth(); 
    this.props.history.push(ROUTES.USER);
  }
  
  render() {
    return (
      <ul>
        <li><GithubButton type='light' onClick={this.submitHandler} id='btn_github' /></li>
      </ul>
    );
  }
}
NavigationNonAuthBase.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const NavigationAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}> Front </Link></li>
    <li><Link to={ROUTES.USER}> Home </Link></li>
    <li><Link to={ROUTES.ADMIN}> Admin </Link></li>
    <li><SignOutButton /></li>
  </ul>
);

const NavigationNonAuth = compose(
  withRouter,
  withFirebase,
)(NavigationNonAuthBase);

export default Navbar;
