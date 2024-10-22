const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rendezvous = sequelize.define('Rendezvous', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: false
  },
  motif: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('programmé', 'terminé', 'annulé'),
    defaultValue: 'programmé'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Rendezvous;