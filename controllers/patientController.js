const Patient = require('../models/Patient');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, date_naissance, sexe, adresse, telephone, email } = req.body;
        const patient = await Patient.create({
            nom,
            prenom,
            date_naissance,
            sexe,
            adresse,
            telephone,
            email
        });
        res.status(201).json({ message: "Patient créé avec succès", patientId: patient.id });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du patient", error: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des patients", error: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, date_naissance, sexe, adresse, telephone, email } = req.body;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouvé" });
        }
        await patient.update({ nom, prenom, date_naissance, sexe, adresse, telephone, email });
        res.json({ message: "Patient mis à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du patient", error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouvé" });
        }
        await patient.destroy();
        res.json({ message: "Patient supprimé avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la suppression du patient", error: error.message });
    }
};