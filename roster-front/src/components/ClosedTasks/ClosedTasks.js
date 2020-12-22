import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';
import BalanceRecord from '../BalanceRecord';

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
    const records = this.state.records;
    const loading = this.state.loading;
    if (loading) {
      return (
        <div className='project_latest'>
          <h4>Just closed</h4>
          <div className='closed_tasks'>
            <p>Loading records...</p>
          </div>
        </div>
      );
    }
    return (
      <div className='project_latest'>
        <h4>Just closed</h4>
        <div className='closed_tasks'>
          <table>
            <tbody>
              {records ? records.map((record, i) => {
                return (<BalanceRecord key={i} record={record} index={i} />);
              }) : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ClosedTasks.propTypes = {
  firebase: PropTypes.object.isRequired,
  project: PropTypes.string.isRequired
};

export default withFirebase(ClosedTasks);