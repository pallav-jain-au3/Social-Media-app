/* eslint-disable promise/no-nesting */
const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllScreams, postOneScream, getScream } = require("./handlers/screams");
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require("./handlers/users");
const FBAuth = require("./util/fbAuth");


//Scream Routes
app.get("/screams", getAllScreams);
app.post("/screams", FBAuth, postOneScream);
app.get('/screams/:screamId', getScream)

// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth,uploadImage);
app.post("/user", FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)


exports.api = functions.https.onRequest(app);
