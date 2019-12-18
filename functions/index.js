/* eslint-disable promise/no-nesting */
const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  postOneScream,
  commentOnScream,likeScream,
  unlikeScream
} = require("./handlers/screams");
const { signup, login, uploadImage } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");
//Scream Routes
app.get("/screams", getAllScreams);
app.post("/screams", FBAuth, postOneScream);
app.post("/screams/:screamId/comment", FBAuth, commentOnScream);
app.get('/screams/:screamId/like', FBAuth, likeScream)
app.get('/screams/:screamId/unlike', FBAuth, unlikeScream)
// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);
