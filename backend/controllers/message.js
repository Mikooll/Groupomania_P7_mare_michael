const models = require("../models");
const Message = models.messages;
const User = models.users;

const fs = require("fs");

exports.findAllMess = (req, res, next) => {
  Message.findAll()
    .then((mess) => {
      console.log(mess);
      res.status(200).json({ data: mess });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneMess = (req, res, next) => {
  Message.findOne({ where: { _id: req.params.id } });
  then((message) => {
    console.log(message);
    res.status(200).json(message);
  }).catch((error) => res.status(404).json({ error }));
};

exports.createMessage = (req, res, next) => {
  // stockage des données du Front en objet
  const messObj = JSON.parse(req.body.message);
  // suppression de l'id auto
  delete messObj._id;
  
  const message = new Message(
    req.body.img
      ? {
          ...messObj,
          // Création de l'URL de l'image : http://localhost:8080/images/nomdufichier
          img: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...messObj }
  );

  // Enregistrement de l'objet message dans la base de données
  message
    .save()
    .then(() => res.status(201).json({ message: "Message créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyMessage = (req, res, next) => {
  const messObj = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // si contient une nouvelle image
      }
    : {
        ...req.body, // si pas de nouvelle image
      };
  Message.update(
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
        message: "Message modifié",
      })
    )
    .catch(() =>
      res.status(400).json({
        error,
      })
    );
};

exports.deleteMessage = (req, res, next) => {
  Comment.destroy({ where: { _id: req.params.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
