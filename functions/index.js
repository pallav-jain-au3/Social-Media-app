/* eslint-disable promise/no-nesting */
const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  postOneScream,
  commentOnScream
} = require("./handlers/screams");
const { signup, login, uploadImage } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");

//Scream Routes
app.get("/screams", getAllScreams);
app.post("/screams", FBAuth, postOneScream);
app.post("/screams/:screamId/comment", FBAuth, commentOnScream);

// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
