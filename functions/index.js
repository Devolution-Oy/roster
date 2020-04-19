const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// HTTP Callable: Create a new user record into firestore
exports.addUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Aunauthenticated');
  }

  return admin.firestore().collection('users').doc(data.useruid).set(data.userdata);
});

exports.deleteUser = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
});