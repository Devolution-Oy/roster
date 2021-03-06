const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { formatTimestamp } = require('./utils/formatTimestamp');

module.exports = async(data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated');
  }

  const githubUser = data.user;
  return admin.firestore()
    .collection('records')
    .where('githubUser', '==', githubUser)
    .orderBy('timestamp', 'desc')
    .get()
    .then(query => {
      var records = [];
      var balance = 0;
      query.forEach(entry => {
        data = entry.data();
        balance = balance + data.amount;
        var record = {
          date: null,
          description: null,
          amount: null
        };

        record.date = formatTimestamp(data.timestamp);
        record.description = data.project + ' (' + data.issue + '): ' + data.description;
        record.amount = data.amount;
        records.push(record);
      });

      var result = {
        total: balance,
        records: records
      };

      return new Promise(resolve => {
        resolve(result);
      });
    });
};
