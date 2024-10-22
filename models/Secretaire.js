const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Secretaire = sequelize.define('Secretaire', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_profil: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (secretaire) => {
      if (secretaire.password) {
        const salt = await bcrypt.genSalt(10);
        secretaire.password = await bcrypt.hash(secretaire.password, salt);
      }
    },
    beforeUpdate: async (secretaire) => {
      if (secretaire.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        secretaire.password = await bcrypt.hash(secretaire.password, salt);
      }
    }
  }
});

Secretaire.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Secretaire;