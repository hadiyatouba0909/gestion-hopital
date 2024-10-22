const Secretaire = require('../models/Secretaire');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, password } = req.body;
        const secretaire = await Secretaire.create({
            nom,
            prenom,
            email,
            telephone,
            password
        });
        res.status(201).json({ message: "Secrétaire créé(e) avec succès", secretaireId: secretaire.id });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du/de la secrétaire", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const secretaire = await Secretaire.findOne({ where: { email } });
        if (!secretaire) {
            return res.status(401).json({ message: "Authentification échouée" });
        }
        const isValid = await secretaire.validPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: "Authentification échouée" });
        }
        const token = jwt.sign({ id: secretaire.id, role: 'secretaire' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, secretaireId: secretaire.id });
    } catch (error) {
        res.status(400).json({ message: "Erreur de connexion", error: error.message });
    }
};

exports.getSecretaires = async (req, res) => {
    try {
        const secretaires = await Secretaire.findAll({ attributes: { exclude: ['password'] } });
        res.json(secretaires);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des secrétaires", error: error.message });
    }
};

exports.updateSecretaire = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone } = req.body;
        const secretaire = await Secretaire.findByPk(id);
        if (!secretaire) {
            return res.status(404).json({ message: "Secrétaire non trouvé(e)" });
        }
        await secretaire.update({ nom, prenom, email, telephone });
        res.json({ message: "Secrétaire mis(e) à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du/de la secrétaire", error: error.message });
    }
};

exports.deleteSecretaire = async (req, res) => {
    try {
        const { id } = req.params;
        const secretaire = await Secretaire.findByPk(id);
        if (!secretaire) {
            return res.status(404).json({ message: "Secrétaire non trouvé(e)" });
        }
        await secretaire.destroy();
        res.json({ message: "Secrétaire supprimé(e) avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la suppression du/de la secrétaire", error: error.message });
    }
};