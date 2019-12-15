/* eslint-disable promise/no-nesting */
const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, login, uploadImage } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");


//Scream Routes
app.get("/screams", getAllScreams);
app.post("/screams", FBAuth, postOneScream);

// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth,uploadImage);

// eslint-disable-next-line consistent-return

exports.api = functions.https.onRequest(app);
