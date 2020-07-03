import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BalanceView.css';
import { withFirebase} from '../Firebase'; 

// TODO: Add style for the balance view

// TODO: Add expandable scroll area for the records

const BalanceViewTotalRow = amount => {
  const amountValue = amount.amount;
  return (
    <div id='balanceview_total_row'>
      <label className='label__total_description' id='description_total'>Account&apos;s total balance</label>
      <label className='label__total_sum' id='sum_total'>{amountValue.toFixed(2)} €</label><br />
    </div>
  );
};

const BalanceRecord = (record) => {
  return (
    <div id={'balance_record_' + record.index} className='balance_record'>
      <label id={'date_recent_' + record.index} >{record.record.date}</label>
      <label id={'description_recent_' + record.index} >{record.record.description}</label>
      <label id={'amount_recent_' + record.index}>{record.record.amount.toFixed(2)} €</label><br />
    </div>);
};

class BalanceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: null,
      loading: false,
      error: null
    };
  }

  fetchBalance = () => {
    this.setState({loading: true});
    this.props.firebase.getUserBalance(this.props.user.data.githubUser)
      .then(res => {
        this.setState({ balance: res.data, loading: false });
      }).catch(error => {
        this.setState({ error, loading: false} );
      });
  };

  componentDidMount() {
    this.fetchBalance();
  }

  render() {
    const { balance, loading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (loading) {
      return <p>Loading the balance...</p>;
    }

    if (null == balance) {
      return <p>Waiting for the balance...</p>;
    }

    return (
      <div id='balance_view'>
        <BalanceViewTotalRow amount={balance.total} />
        <hr />
        
        <div id='balance_records'>
          {
            balance.records.map((record, i) => {
              return (<BalanceRecord key={i} record={record} index={i} />);
            })
          }
        </div>
      </div>
    );
  }
}

BalanceView.propTypes = {
  firebase: PropTypes.object,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    data: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      githubUser: PropTypes.string.isRequired,
      role: PropTypes.number.isRequired, 
    })
  })
};

export default withFirebase(BalanceView);