const vision = require('@google-cloud/vision')();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors');
const express = require('express');
const app = express();

const validateIdToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(idToken)
      .then(user => next())
      .catch(e => res.status(403).send('Unauthorized'));
  } else {
    res.status(403).send('Unauthorized');
  }
};

app.use(cors({
  origin: true,
}));

app.use(validateIdToken);

app.post('/annotateImage', (req, res) => {
  const content = req.body.content;
  vision.annotate({
    features: [
      {type: 'LABEL_DETECTION', maxResults: 5},
      {type: 'SAFE_SEARCH_DETECTION'},
    ],
    image: {content}
  })
  .then(data => res.contentType('application/json').send(data[0]));
});

exports.app = functions.https.onRequest(app);
