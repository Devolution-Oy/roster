import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { withFirebase } from '../Firebase';


const ShowLoading = () => (
  <div id='show_loading' >
    <p>Loading users and projects...</p>
  </div>
);

const ShowError = msg => (
  <div id='show_error' >
    <p>{msg}</p>
  </div>
);

class AddRecordPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      projects: null,
      error: null,
      project: null,
      user: null,
      amount: 0,
      issue: 0,
      description: ''
    };  
  }
  addRecord = () => {
    // TODO: Validate record before calling postCustomRecord
    console.log('Adding a record');
    const record = {
      project: this.state.project,
      description: this.state.description,
      amount: this.state.amount,
      issue: this.state.issue,
      githubUser: this.state.user,
      timestamp: Date.UTC()
    };

    console.log(record);
    if (window.confirm('Add a new balance "'+ record.description + '" record for user "' + record.githubUser +'"?')) {
      this.props.firebase.postCustomRecord(record).then(_res => {
        console.log('Sent custom record');
        this.props.closeAddRecord();
      }).catch(error => {
        window.alert(error.message);
      });
    } 
  };

  getUsers = () => {
    console.log('fetching users with firebase');
    return this.props.firebase.getUsers();
  }

  getProjects = () => {
    console.log('fetching projects');
    return this.props.firebase.getProjects();
  }

  componentDidMount() {
    this.setState({loading: true});
    Promise.all([this.getUsers(), this.getProjects()]).then((values) => {
      this.setState({ users: values[0].data, projects: values[1].data });
    }).catch(error => {
      this.setState({error: error});
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const users = this.state.users;
    const projects = this.state.projects;
    const error = this.state.error;
    if (!users || !projects) {
      console.log('No users or projects');
      return (
        <Modal
          id='modal_add_record'
          title='Add Custom Record'
          onCancel={this.props.closeAddRecord}
          onAccept={this.addRecord}
          accept='Confirm'
          disabled={true}>
          <ShowLoading />
        </Modal>
      );
    }

    if (error) {
      console.log(error.message);
      return (
        <Modal
          id='modal_add_record'
          title='Add Custom Record'
          onCancel={this.props.closeAddRecord}
          onAccept={this.addRecord}
          accept='Confirm'
          disabled={true}>
          <ShowError msg={error.message} />
        </Modal>
      );
    }
    return (
      <Modal
        id='modal_add_record'
        title='Add Custom Record'
        onCancel={this.props.closeAddRecord}
        onAccept={this.addRecord}
        accept='Confirm'>

        <div id='form_add_record' className='post_record'>
          <label>User</label>
          <select id='select_record_user' name='user' onChange={this.onChange}>
            <option>Select user</option>
            {
              users.map((user, i) => {
                return (<option key={i} value={user.githubUser}>{user.githubUser}</option>);
              })
            }
          </select>
          <label>Project</label>
          <select id='select_record_project' name='project' onChange={this.onChange}>
            <option>Select project</option>
            {
              projects.map((project, i) => {
                return (<option key={i} value={project.name}>{project.name}</option>);
              })
            }
          </select>

          <label>Description</label>
          <input name='description' id='input_record_description' type='text' onChange={this.onChange} />
          <label>Issue</label>
          <input name='issue' id='input_record_issue' type='text' onChange={this.onChange} />
          <label>Amount</label>
          <input name='amount' id='input_record_amount' type='number' onChange={this.onChange} />
        </div>
      </Modal>
    );
  }
}

AddRecordPopup.propTypes = {
  closeAddRecord: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired
};

export default withFirebase(AddRecordPopup);