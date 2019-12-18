const { db } = require("../util/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
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
};

exports.postOneScream = (req, res) => {
  let newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };
  console.log("newScream", newScream);
  db.collection("screams")
    .add(newScream)
    .then(doc => res.json(doc.id))
    .catch(err => {
      res.status(500).json({ err: "something went wrong" });
      console.log(err);
    });
};

exports.commentOnScream = (req, res) => {
  console.log(req.body);
  if (req.body.body.trim() == "") {
    return res.status(400).json({ error: "Must not be empty" });
  }
  let newComment = {
    body: req.body.body,
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    imageUrl: req.user.imageUrl,
    createdAt: new Date().toISOString()
  };

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Not found" });
      }

      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.status(201).json({ message: "comment added successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
