const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const serviceAccount = require("./keys/social-media-7f318-firebase-adminsdk-u1kgz-828d175c4e");
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAqYd1ngTX3uNATqsaGRCqfuNd8dArelnQ",
  authDomain: "social-media-7f318.firebaseapp.com",
  databaseURL: "https://social-media-7f318.firebaseio.com",
  projectId: "social-media-7f318",
  storageBucket: "social-media-7f318.appspot.com",
  messagingSenderId: "906727716659",
  appId: "1:906727716659:web:8f976606e625b58f2db046",
  measurementId: "G-3Z8W3BHEGM"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

firebase.initializeApp(firebaseConfig);

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          likeCount: doc.data().likeCount,
          dislikeCount: doc.data().dislikeCount
        });
      });
      return res.json(screams);
    })
    .catch(err => {
      res.status(400).json({ err: "something went wrong" });
      console.log(err);
    });
});

app.post("/screams", (req, res) => {
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

app.post("/signup", (req, res) => {
  console.log(req.body);
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: user.body.handle
  };

  firesbase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => res.status(201).json({ messge: "user Created Succesfully" }))
    .catch(err => {
      console.log(err);
      return res.status(500).json({ err: err.code });
    });
});

exports.api = functions.https.onRequest(app);
