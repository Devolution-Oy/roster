import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollBar from 'react-perfect-scrollbar';
import { withFirebase} from '../Firebase'; 

import 'react-perfect-scrollbar/dist/css/styles.css';
import './BalanceView.css';

// TODO: Add style for the balance view

// TODO: Add resizable element box for balance records

const BalanceViewTotalRow = amount => {
  const amountValue = amount.amount;
  return (
    <div id='balanceview_total_row'>
      <table>
        <tbody>
          <tr>
            <td><label className='label__total_description' id='description_total'>Account&apos;s total balance</label></td>
            <td className='td_amount'><label className='label__total_sum' id='sum_total'>{amountValue.toFixed(2)} €</label><br /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const BalanceRecord = (record) => {
  return (
    <tr>
      <td>
        <label id={'date_recent_' + record.index} >{record.record.date}</label>
      </td>
      <td>
        <label id={'description_recent_' + record.index} >{record.record.description}</label>
      </td>
      <td className='td_amount' red={record.record.amount < 0 ? 'true' : undefined}>
        <label id={'amount_recent_' + record.index}>{record.record.amount.toFixed(2)} €</label><br />
      </td>
    </tr>);
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
    if (!this.state.balance) {
      this.fetchBalance();
    }
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

        <div className='balance_records'>
          <ScrollBar component='div' >
            <div className='balance_records_content'>
              <table>
                <tbody>
                  {
                    balance.records.map((record, i) => {
                      return (<BalanceRecord key={i} record={record} index={i} />);
                    })
                  }
                </tbody>
              </table>
            </div>
          </ScrollBar>
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