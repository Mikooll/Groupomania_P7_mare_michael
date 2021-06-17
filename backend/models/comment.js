"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      user: DataTypes.STRING,
      message: DataTypes.STRING,
      content: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};
