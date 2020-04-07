import React from 'react';
// import logo from './roster-logo.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Route }
from 'react-router-dom';

import FrontPage from './pages/Front';
import AuthPage from './pages/Auth';
import UserPage from './pages/User';
import AdminPage from './pages/Admin';
import Navbar from './components/Navbar';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <main className="main-content">
        <Route exact path={ROUTES.LANDING} component={FrontPage} />
        <Route exact path={ROUTES.AUTH}    component={AuthPage} />
        <Route exact path={ROUTES.USER}    component={UserPage} />
        <Route exact path={ROUTES.ADMIN}   component={AdminPage} />
      </main>
    </div>
  </Router>
);

export default withAuthentication(App);
