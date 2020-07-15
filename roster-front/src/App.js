import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import logo from './roster-logo.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import FrontPage from './pages/Front';
import UserPage from './pages/User/User';
import AdminPage from './pages/Admin/Admin';
import TestLoginPage from './pages/TestLogin';
import ErrorPage from './pages/Error';
import LoadingPage from './pages/Loading';
import Navbar from './components/Navbar';
import { withFirebase } from './components/Firebase';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: null,
      projects: null,
      error: null,
    };
  }
  
  componentDidMount() {
    this.setState({loading: true});
    this.props.firebase.getProjects().then(res => {
      this.setState({
        projects: res.data,
        loading: false,
        error: null
      });
    }).catch(err => {
      console.log(err.message);
      this.setState({
        loading: false,
        error: err
      });
    });

  }
  render() {
    const projects = this.state.projects;
    const error = this.state.error;
    const loading = this.state.loading;
    if (loading) {
      return (
        <LoadingPage />
      );
    }

    if (error) {
      console.log(error);
      return (
        <ErrorPage error={error.message}/>
      );
    }

    return (
      <Router>
        <div>
          <Navbar />
          <main className='main-content'>
            <Route exact path={ROUTES.LANDING} component={FrontPage} />
            <Route exact path={ROUTES.USER} component={() => <UserPage projects={projects} />} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.TEST_LOGIN} component={TestLoginPage} />
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  firebase: PropTypes.object
};

export default withFirebase(withAuthentication(App));
