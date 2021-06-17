const db = require("../models");
const Comment = db.comments;
const User = db.users;

exports.findAllComm = (req, res, next) => {
  Comment.findAll()
    .then((comm) => {
      console.log(comm);
      res.status(200).json({ data: comm });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneComm = (req, res, next) => {
  Comment.findOne({ where: { _id: req.params.id } });
  then((comment) => {
    console.log(comment);
    res.status(200).json(comment);
  }).catch((error) => res.status(404).json({ error }));
};

exports.createComment = (req, res, next) => {
  // stockage des données du Front en objet
  const commObj = JSON.parse(req.body.comment);
  // suppression de l'id auto
  delete commObj._id;

  const comment = new Comment({
    ...messObj,
  });

  // Enregistrement de l'objet message dans la base de données
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire envoyé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment= (req, res, next) => {
  const commObj = req.body;

  Comment.update(
    {
      where: { _id: req.params.id },
    },
    {
      ...messObj,
      _id: req.params.id,
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Commentaire modifié",
      })
    )
    .catch(() =>
      res.status(400).json({
        error,
      })
    );
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { _id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
