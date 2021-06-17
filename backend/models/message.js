'use strict';

const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {};
    
    Message.init({
        user: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        content: DataTypes.STRING,
        img: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Message'
    });

    return Message;
}