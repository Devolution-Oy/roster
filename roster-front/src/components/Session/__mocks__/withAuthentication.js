import React from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../context';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: props.authUser
      };
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
    authUser: PropTypes.object
  };
  return WithAuthentication;
};

export default withAuthentication;
