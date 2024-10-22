const Assistante = require('../models/Assistante');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, password, photo_profil } = req.body;
        const assistante = await Assistante.create({
            nom,
            prenom,
            email,
            telephone,
            password,
            photo_profil
        });
        res.status(201).json({ message: "Assistante créée avec succès", assistanteId: assistante.id });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création de l'assistante", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const assistante = await Assistante.findOne({ where: { email } });
        if (!assistante) {
            return res.status(401).json({ message: "Authentification échouée" });
        }
        const isValid = await assistante.validPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: "Authentification échouée" });
        }
        const token = jwt.sign({ id: assistante.id, role: 'assistante' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, assistanteId: assistante.id });
    } catch (error) {
        res.status(400).json({ message: "Erreur de connexion", error: error.message });
    }
};

exports.getAssistantes = async (req, res) => {
    try {
        const assistantes = await Assistante.findAll({ attributes: { exclude: ['password'] } });
        res.json(assistantes);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la récupération des assistantes", error: error.message });
    }
};

exports.updateAssistante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, telephone, photo_profil } = req.body;
        const assistante = await Assistante.findByPk(id);
        if (!assistante) {
            return res.status(404).json({ message: "Assistante non trouvée" });
        }
        await assistante.update({ nom, prenom, email, telephone, photo_profil });
        res.json({ message: "Assistante mise à jour avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour de l'assistante", error: error.message });
    }
};

exports.deleteAssistante = async (req, res) => {
    try {
        const { id } = req.params;
        const assistante = await Assistante.findByPk(id);
        if (!assistante) {
            return res.status(404).json({ message: "Assistante non trouvée" });
        }
        await assistante.destroy();
        res.json({ message: "Assistante supprimée avec succès" });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la suppression de l'assistante", error: error.message });
    }
};