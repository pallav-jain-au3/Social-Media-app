/* eslint-disable promise/no-nesting */
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

const isEmpty = (string) => string.trim() === '';
const isValidEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true
    else return false;
}

app.post("/signup", (req, res) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  let error = {};
  if (isEmpty(newUser.email)){
      error.email = "Must not be empty"
  }
  else if(isValidEmail(newUser.email)){
      error.email = "Email must be a valid string"
  }
  if (isEmpty(newUser.handle)){
    error.handle = "Must not be empty"
 }


  if (isEmpty(newUser.password)){
      error.password = "Must not be empty"
  }

  if (newUser.password !== newUser.confirmPassword){
      error.confirmPassword = "Password must match"
  }

  if (Object.keys(error).length > 0){
      return res.status(400).json(error)
  }
  


  let token, userId;

  // eslint-disable-next-line promise/catch-or-return
  admin
    .firestore()
    .doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: "This handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then(data => {
              userId = data.user.uid
            return data.user.getIdToken();
          })
          .then(idToken => {
              token = idToken;
              const userCredentials  = {
                  email:newUser.email,
                  handle :newUser.handle,
                  createdAt : new Date().toISOString(),
                  userId
                }
            return admin.firestore().doc(`/users/${newUser.handle}`).set(userCredentials)    
           
          })
          .then(()=> {
                return res.status(201).json({ token });
          })
          .catch(err => {
            if (err.code === "auth/email-already-in-use") {
              return res.status(400).json({ email: "Email laready exists" });
            } else {
              return res.status(500).json({ err: err.code });
            }
          });
      }
    });
});

exports.api = functions.https.onRequest(app);
