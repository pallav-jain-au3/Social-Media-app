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

exports.getScream = (req, res) => {
  let screamData = {};

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .orderBy('createdAt', 'desc')
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then(data => {
      screamData.comments = [];
      console.log(data._size);
      data.forEach(doc => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ err: err.code });
    });
};

exports.commentOnScream = (req, res) =>{
  
}
