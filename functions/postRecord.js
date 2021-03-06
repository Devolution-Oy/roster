const crypto = require('crypto-js');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const updateBudget = (project, amount) => {

  console.log('Trying to search ' + project);
  return admin.firestore()
    .collection('projects')
    .where('repositories', 'array-contains', project)
    .get().then(res => {
      return res.forEach(doc => {
        data = doc.data();
        console.log(data)

        var budget = 0;
        if (data.budget) {
          budget = data.budget;
          console.log('Budget before ' + budget);
        }

        const newBudget = budget - amount;
        data.budget = newBudget;
        console.log('New budget before ' + newBudget);
        admin.firestore()
          .collection('projects')
          .doc(data.name)
          .set(data);
      });
  });
};

/*
  Validate new record post
*/
const validatePostBalance = req => {
  const tasker_app_id = functions.config().tasker_app_id.value;

  if (!req.headers.authorization || req.headers.authorization !== tasker_app_id) {
    console.log('Received header ' + req.headers.authorization);
    console.log(tasker_app_id);
    console.error('No authorization token was passed in the request header or the token is not correct.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: <TASKER_APP_ID>');
    return { code: 403, message: 'Unauthorized' };
  }

  if (req.method !== 'POST') {
    return { code: 400, message: 'Invalid method' };
  }

  if (!req.body.githubUser 
    || !req.body.project
    || !req.body.amount
    || !req.body.issue
    || !req.body.timestamp
    || !req.body.action
    || !req.body.description) {
    return { code: 400, message: 'Bad Request' };
  }

  return { code: 200, message: 'OK' };
};

exports.postCustomRecord = async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Unauthenticated');
  }

  if ( !data.githubUser 
    || !data.project
    || !data.amount
    || !data.issue
    || !data.action
    || !data.timestamp
    || !data.description) {
    console.log('Invalid data:');
    console.log(data);
    throw new functions.https.HttpsError('invalid-argument', 'Record data is not valid');
  }

  try {
    // TODO: Add a new project if project doesn't exist yet
    await updateBudget(data.project, data.amount);
    const hash = crypto.MD5(data.githubUser + data.project + data.issue + data.action);
    return admin.firestore().collection('records').doc(hash.toString()).set(data);
  } catch (err) {
    console.log(err);
    throw new functions.https.HttpsError('internal', err.message);
  }

};

exports.handlePostRecord = async(req, res) => {
  const status = validatePostBalance(req);

  if (status.code !== 200) {
    res.status(status.code).send(status.message);
  } else {
    try {
      let data = req.body;
      await updateBudget(data.project, data.amount);
      const hash = crypto.MD5(data.githubUser + data.project + data.issue + data.action);
      await admin.firestore().collection('records').doc(hash.toString()).set(data);
      res.status(200).send('OK (' + hash + ')');

    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
};