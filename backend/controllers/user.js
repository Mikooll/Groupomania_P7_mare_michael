const db = require("../db/models");
const User = db.User;
const Comment = db.Comment;
const Message = db.Message;

const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sequelize } = require("../db/models");

exports.signup = (req, res, next) => {
  console.log("In signup");
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
      });
      //   // Sauvegarde dans la base de données
      //   console.log(user)
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Authentification d'un utilisateur déjà créé
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé",
        });
      }
      // comparaison des hashs et vérifie s'ils ont le meme string d'origine
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            firstname: user.firstname,
            name: user.name,
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              {
                // encode un nouveau token d'authentification en tant que payload
                userId: user.id,
              },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

exports.deleteProfile = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      console.log(user)
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
