// middleware/auth.js
const jwt = require('jsonwebtoken');
const Medecin = require('../models/Medecin');
const Secretaire = require('../models/Secretaire');
const Assistante = require('../models/Assistante');

exports.authenticate = async (req, res, next) => {
    try {
        // Vérifier si le header Authorization existe
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Token manquant" });
        }

        // Récupérer le token
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Chercher l'utilisateur selon son rôle
        let user = null;
        switch (decoded.role) {
            case 'medecin':
                user = await Medecin.findByPk(decoded.id);
                break;
            case 'secretaire':
                user = await Secretaire.findByPk(decoded.id);
                break;
            case 'assistante':
                user = await Assistante.findByPk(decoded.id);
                break;
            default:
                throw new Error('Rôle invalide');
        }

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Ajouter l'utilisateur et son rôle à la requête
        req.user = user;
        req.user.role = decoded.role;
        
        next();
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(401).json({ 
            message: "Authentication failed", 
            error: error.message 
        });
    }
};

exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: "Accès non autorisé pour ce rôle" 
            });
        }
        next();
    };
};

exports.canModifyUser = async (req, res, next) => {
    try {
        const { role } = req.user;
        const { targetRole } = req.body;

        // Un médecin peut gérer des secrétaires et des assistantes
        if (role === 'medecin' && ['secretaire', 'assistante'].includes(targetRole)) {
            return next();
        }

        // Une secrétaire peut gérer des patients
        if (role === 'secretaire' && targetRole === 'patient') {
            return next();
        }

        return res.status(403).json({ 
            message: "Vous n'avez pas les droits pour effectuer cette action" 
        });
    } catch (error) {
        console.error('Erreur lors de la vérification des droits:', error);
        return res.status(500).json({ 
            message: "Erreur lors de la vérification des droits", 
            error: error.message 
        });
    }
};
