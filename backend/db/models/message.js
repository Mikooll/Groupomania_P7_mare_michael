'use strict';
const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {};
    
    Message.init({
        userId: DataTypes.STRING,
        content: DataTypes.STRING,
        img: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Message'
    });
    const User = require('./user')(sequelize, DataTypes)
    Message.User = Message.belongsTo(User)
    
    return Message;
}