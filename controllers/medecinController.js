const Medecin = require('../models/Medecin');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nom, prenom, specialite, email, telephone, password, adresse_professionnelle, photo_profil } = req.body;
    const medecin = await Medecin.create({ 
      nom, 
      prenom, 
      specialite, 
      email, 
      telephone, 
      password, 
      adresse_professionnelle ,
      photo_profil
    });
    res.status(201).json({ message: "Médecin créé avec succès", medecinId: medecin.id });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du médecin", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const medecin = await Medecin.findOne({ where: { email } });
    if (!medecin) {
      return res.status(401).json({ message: "Authentification échouée" });
    }
    const isValid = await medecin.validPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "Authentification échouée" });
    }
    const token = jwt.sign({ id: medecin.id, role: 'medecin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, medecinId: medecin.id });
  } catch (error) {
    res.status(400).json({ message: "Erreur de connexion", error: error.message });
  }
};

exports.getMedecins = async (req, res) => {
  try {
    const medecins = await Medecin.findAll({ attributes: { exclude: ['password'] } });
    res.json(medecins);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la récupération des médecins", error: error.message });
  }
};

exports.updateMedecin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, specialite, email, telephone, adresse_professionnelle } = req.body;
    const medecin = await Medecin.findByPk(id);
    if (!medecin) {
      return res.status(404).json({ message: "Médecin non trouvé" });
    }
    await medecin.update({ nom, prenom, specialite, email, telephone, adresse_professionnelle });
    res.json({ message: "Médecin mis à jour avec succès" });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du médecin", error: error.message });
  }
};

exports.deleteMedecin = async (req, res) => {
  try {
    const { id } = req.params;
    const medecin = await Medecin.findByPk(id);
    if (!medecin) {
      return res.status(404).json({ message: "Médecin non trouvé" });
    }
    await medecin.destroy();
    res.json({ message: "Médecin supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la suppression du médecin", error: error.message });
  }
};