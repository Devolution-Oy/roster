import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

class ClosedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      records: null
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.props.firebase.getRecords(this.props.project).then(res => {
      this.setState({
        loading: false,
        records: res.data
      });
    }).catch(err => {
      console.log(err.message);
      this.setState({ loading: false });
    });
  }

  // TODO: Render closed tasks from state.records
  render() {
    return (
      <div className='project_latest'>
        <h4>Just closed</h4>
        <label>Latest closed task1</label>
        <label>Latest closed task2</label>
        <label>Latest closed task3</label>
      </div>
    );
  }
}

ClosedTasks.propTypes = {
  firebase: PropTypes.object.isRequired,
  project: PropTypes.string.isRequired
};

export default withFirebase(ClosedTasks);