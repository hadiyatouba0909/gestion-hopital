const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Assistante = sequelize.define('Assistante', {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_profil: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: async (assistante) => {
      if (assistante.password) {
        const salt = await bcrypt.genSalt(10);
        assistante.password = await bcrypt.hash(assistante.password, salt);
      }
    },
    beforeUpdate: async (assistante) => {
      if (assistante.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        assistante.password = await bcrypt.hash(assistante.password, salt);
      }
    }
  }
});

Assistante.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Assistante;