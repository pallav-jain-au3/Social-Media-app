const {
  db
} = require("../util/admin");

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
      res.status(400).json({
        err: "something went wrong"
      });
      console.log(err);
    });
};

exports.postOneScream = (req, res) => {
  let newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
    createdAt: new Date().toISOString()
  };
  db.collection("screams")
    .add(newScream)
    .then(doc => {

      const resScream = newScream
      resScream.id = doc.id
      res.json(resScream)
    })
    .catch(err => {
      res.status(500).json({
        err: "something went wrong"
      });
      console.log(err);
    });
};

exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() == "") {
    return res.status(400).json({
      error: "Must not be empty"
    });
  }
  let newComment = {
    body: req.body.body,
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    imageUrl: req.user.imageUrl,
    createdAt: new Date().toISOString()
  };
  let screamData;

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({
          error: "Not found"
        });
      }
      screamData = doc.data();
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      screamData.commentCount++
      db.doc(`/screams/${req.params.screamId}`).update({
        commentCount: screamData.commentCount
      })
    })
    .then(() => {
      res.status(201).json(screamData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err.code
      });
    });
};


exports.likeScream = (req, res) => {

  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle).where('screamId', '==', req.params.screamId).limit(1);
  let screamDocument = db.doc(`/screams/${req.params.screamId}`)
  let screamData;
  screamDocument.get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = req.params.screamId;
        return likeDocument.get()
      } else {
        return res.status(404).json({
          error: "not found"
        })
      }
    })
    .then(data => {
      if (data.empty) {
        return db.collection('likes').add({
            screamId: req.params.screamId,
            userHandle: req.user.handle
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({
              likeCount: screamData.likeCount
            })
          })
          .then(() => res.json(screamData))
      } else {
        res.status(400).json({
          error: "Scream already liked"
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: "Something went wrong"
      })
    })


}

exports.unlikeScream = (req, res) => {
  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle).where('screamId', '==', req.params.screamId).limit(1);
  let screamDocument = db.doc(`/screams/${req.params.screamId}`)
  let screamData;
  screamDocument.get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = req.params.screamId;
        return likeDocument.get()
      } else {
        return res.status(404).json({
          error: "not found"
        })
      }
    })
    .then(data => {
      if (data.empty) {
        return res.status(400).json({
          error: "Scream not liked"
        })

      } else {
        return db.doc(`/likes/${data.docs[0].id}`).delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({
              likeCount: screamData.likeCount
            })

          })
          .then(() => {
            return res.json(screamData)
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err.code
      })
    })
}
//Delete scream
exports.deleteScream = (req, res) => {
  let document = db.doc(`/screams/${req.params.screamId}`);
  document.get()
  .then(doc=>{
    if(!doc.exists){
      return res.status(404).json({error:"Scream not found"})
    }
    if (doc.data().userHandle !== req.user.handle){
      return res.status(403).json({error:"Unauthorised request"})
    }
    else{
      document.delete()
    }
  })
  .then(()=>{
    return res.json({message:"Scream deleted successfully"})
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({error:error.code})
  })
}