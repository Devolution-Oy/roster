import React, { Component } from 'react';

import AdminNav from '../components/Admin_nav';
import AdminContext from '../context/admin-context';
import AuthContext from '../context/auth-context';

class AdminPage extends Component {

  state = {
    show: null
  };

  static contextType = AuthContext;


  render() {
    return (
      <React.Fragment>
        <AdminContext.Provider value={{show: this.show,
                                       set_show: this.set_show}}>
          <AdminNav />
            <h1>Admin page content will be shown here</h1>
        </AdminContext.Provider>
      </React.Fragment>
    );
  }
}

export default AdminPage;
