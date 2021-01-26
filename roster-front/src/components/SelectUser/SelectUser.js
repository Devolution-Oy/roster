import React  from 'react';
import { Component } from 'react';
import { withFirebase } from '../Firebase';

class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }


  render() {
    const users = this.props.users;
    return (
      <div className='select_user'>
        <select id='select_user' name='user' onChange={this.props.setUser}>
          <option>Select user</option>
          {
            users.map((user, i) => {
              return (<option id={'option_' + user.githubUser} key={i} value={user.githubUser}>{user.githubUser}</option>);
            })
          }
        </select>
      </div>
    );
  }
}

export default withFirebase(SelectUser);