import React, { Component } from 'react';

// TODO: Add style for the balance view
// TODO: Load values from firebase
class BalanceView extends Component {
  render() {
    return (
      <div id='balance_view'>
        <label className='label__total_description' id='description_total'>Account&apos;s total balance</label> 
        <label className='label__total_sum' id='sum_total'>9999 €</label><br /> 
        <hr />
        <label className='label__date_recent_1' id='date_recent1' >2020-06-06</label>
        <label className='label__description_1' id='description_recent1' >Did something</label>
        <label className='label__amount_1' id='amount_recent1' >50 €</label><br />
        <label className='label__date_recent_2' id='date_recent2' >2020-06-06</label>
        <label className='label__description_2' id='description_recent2' >Did something</label>
        <label className='label__amount_2' id='amount_recent2' >-50 €</label><br />
        <label className='label__date_recent_3' id='date_recent3' >2020-06-05</label>
        <label className='label__description_3' id='description_recent3' >Did something</label>
        <label className='label__amount_3' id='amount_recent3' >50 €</label><br />
        <label className='label__date_recent_4' id='date_recent4' >2020-06-04</label>
        <label className='label__description_4' id='description_recent4' >Did something</label>
        <label className='label__amount_4' id='amount_recent4' >50 €</label><br />
        <label className='label__date_recent_5' id='date_recent5' >2020-06-03</label>
        <label className='label__description_5' id='description_recent5' >Did something</label>
        <label className='label__amount_5' id='amount_recent5' >50 €</label><br />
      </div>
    );
  }
}

export default BalanceView;