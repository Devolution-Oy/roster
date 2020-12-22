import React from 'react';

const BalanceRecord = record => {
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

export default BalanceRecord;