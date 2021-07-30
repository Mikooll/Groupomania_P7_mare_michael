const db = require("../db/models");
const Comment = db.Comment;
const User = db.User;

exports.findAllComments = (req, res, next) => {
  Comment.findAll({
      where: {
        messageId: req.params.id
      },
      include: {model: User}
    })
    .then((comm) => {
      console.log(comm);
      res.status(200).json({
        data: comm
      });
    })
    .catch((error) => res.status(400).json({
      error
    }));
};

exports.findOneComment = (req, res, next) => {
  Comment.findOne({
      where: {
        id: req.params.id
      },
      include: {model: User}
    })
    .then((comment) => {
      console.log(comment);
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({
      error
    }));
};

exports.createComment = (req, res, next) => {
  // stockage des données du Front en objet
  const commObj = {
    content: req.body.content,
    userId: req.body.userId,
    messageId: req.body.messageId,
  };
  // suppression de l'id auto

  const comment = new Comment({
    ...commObj,
  });

  // Enregistrement de l'objet message dans la base de données
  comment
    .save()
    .then(() => res.status(201).json({
      message: "Commentaire envoyé !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};

exports.modifyComment = (req, res, next) => {
  const commObj = {
    ...req.body
  };

  Comment.update({
      ...commObj,
      id: req.params.id,
    }, {
      where: {
        id: req.params.id
      },
    }, )
    .then(() =>
      res.status(200).json({
        message: "Commentaire modifié",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(200).json({
      message: "Commentaire supprimé !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};