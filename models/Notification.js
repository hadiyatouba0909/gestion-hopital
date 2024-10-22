// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
  type: {
    type: DataTypes.ENUM('rendez-vous', 'message', 'rappel'),
    allowNull: false
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  destinataireId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destinataireType: {
    type: DataTypes.ENUM('medecin', 'patient', 'assistante', 'secretaire'),
    allowNull: false
  }
});

module.exports = Notification;