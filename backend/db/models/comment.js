"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      userId: DataTypes.STRING,
      messageId: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  const User = require('./user')(sequelize, DataTypes)
  Comment.User = Comment.belongsTo(User)

  return Comment;
};
