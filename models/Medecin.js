const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Medecin = sequelize.define('Medecin', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialite: {
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
  adresse_professionnelle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_profil: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (medecin) => {
      if (medecin.password) {
        const salt = await bcrypt.genSalt(10);
        medecin.password = await bcrypt.hash(medecin.password, salt);
      }
    },
    beforeUpdate: async (medecin) => {
      if (medecin.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        medecin.password = await bcrypt.hash(medecin.password, salt);
      }
    }
  }
});

Medecin.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Medecin;