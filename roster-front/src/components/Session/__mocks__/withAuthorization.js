
import React from 'react';

import AuthContext from '../context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
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

  return WithAuthorization;
};
export default withAuthorization;
