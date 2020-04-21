import React from 'react';
import PropTypes from 'prop-types';

import AuthContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    getUserData = authUser => {
      this.props.firebase.getUserData(authUser.uid).then(user => {
        console.log('Succesfully fetched user data');
        console.log(user);
        this.setState({authUser: user});
      }).catch(error => {
        console.log(error);
        this.setState({authUser: null});
      });
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.getUserData(authUser)
            : this.setState({authUser: null});
        },
      );
    }

    componentWillUnmount() {
    //  this.listener();
    }

    render() {
      return (
        <AuthContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthContext.Provider>
      );
    }
  }
  WithAuthentication.propTypes = {
    firebase: PropTypes.object
  };
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
