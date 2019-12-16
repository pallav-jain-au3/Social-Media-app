const admin = require("firebase-admin");

const serviceAccount = require("../keys/social-media-7f318-firebase-adminsdk-u1kgz-828d175c4e");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "social-media-7f318.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };
