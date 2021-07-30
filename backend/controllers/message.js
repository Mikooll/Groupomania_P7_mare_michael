const models = require("../db/models");
const Message = models.Message;
const User = models.User;

const fs = require("fs");

exports.findAllMessages = (req, res, next) => {
  Message.findAll({include: {model: User}})
    .then((mess) => {
      console.log(mess);
      res.status(200).json({ data: mess });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllSpecificMessages = (req, res, next) => {
  // Message.findAll({ where: { userId: req.decodedToken.userId } })
  Message.findAll({ where: { userId: req.params.id }, include: {model: User} })
    .then((mess) => {
      console.log(mess);
      res.status(200).json({ data: mess });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneMessage = (req, res, next) => {
  Message.findOne({ where: { id: req.params.id } })
    .then((message) => {
      console.log(message);
      res.status(200).json(message);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.createMessage = (req, res, next) => {
  console.log("test create");
  // stockage des données du Front en objet
  const messObj = { content: req.body.content, userId: req.body.userId, messageId: req.body.messageId };
  // suppression de l'id auto
  // delete messObj._id;

  const message = new Message(
    req.file
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
  console.log(req.file)
  const messObj = req.file
    ? {
        ...req.body.message,
        img: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }` // si contient une nouvelle image
      }
    : {
    ...req.body, // si pas de nouvelle image
  };

  Message.update(
    {
      ...messObj, id: req.params.id
      
    },
    {
      where: { id: req.params.id },
    }
  )
    .then(() =>
      res.status(200).json({
        message: "Message modifié",
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

exports.deleteMessage = (req, res, next) => {
  Message.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Message supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
