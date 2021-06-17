const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
    }
  );

  const encryptPass = (user) => {
    if (user.changed("password")) {
      return bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
      });
    }
  };

  User.beforeCreate(encryptPass);
  User.beforeUpdate(encryptPass);

  return User;
};
