const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');
const app= express();
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


app.get('/screams', (req, res)=>{
    admin
    .firestore()
    .collection("screams")
    .orderBy('createdAt','desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push(doc.data());
      });
      return res.json(screams);
    })
    .catch(err => {
      res.status(400).json({ err: "something went wrong" });
      console.log(err);
    });
})


app.post('/screams',(req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ error: "method not allowed" });
  }
  let newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };
  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then(doc => res.json(doc.id))
    .catch(err => {
      res.status(500).json({ err: "something went wrong" });
      console.log(err);
    });
});

exports.api = functions.https.onRequest(app)