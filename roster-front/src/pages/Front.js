import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

import './Front.css';

class FrontPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }


  const 
  render() {
    return (
      <React.Fragment>
        <h1>Front page content</h1>
      </React.Fragment>
    );
  }
}

export default FrontPage;
