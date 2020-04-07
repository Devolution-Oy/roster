import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          console.log("Not authorized. Redirecting to login");
          this.props.history.push(ROUTES.USER);
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
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
export default withAuthorization;
