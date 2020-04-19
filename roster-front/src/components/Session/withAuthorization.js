import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          console.log('Not authorized. Redirecting to FrontPage');
          this.props.history.push(ROUTES.LANDING);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthContext.Consumer>  
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthContext.Consumer>  
      );
    }
  }

  WithAuthorization.propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
export default withAuthorization;
