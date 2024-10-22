const Medecin = require('./Medecin');
const Patient = require('./Patient');
const Rendezvous = require('./Rendezvous');
const Assistante = require('./Assistante');
const Secretaire = require('./Secretaire');

module.exports = function defineAssociations() {
  // Associations Médecin
  Medecin.hasMany(Patient);
  Medecin.hasMany(Rendezvous);
  Medecin.hasMany(Assistante);
  Medecin.hasMany(Secretaire);

  // Associations Patient
  Patient.belongsTo(Medecin);
  Patient.hasMany(Rendezvous);

  // Associations Rendez-vous
  Rendezvous.belongsTo(Medecin);
  Rendezvous.belongsTo(Patient);

  // Associations Assistante
  Assistante.belongsTo(Medecin);

  // Associations Secrétaire
  Secretaire.belongsTo(Medecin);
};